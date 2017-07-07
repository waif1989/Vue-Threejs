/* ===========================================================
 * jquery.interactive_3d.js v1.1
 * ===========================================================
 * Copyright 2013 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * Create a 3D interactive object using images as frames
 * with one js call
 *
 * https://github.com/peachananr/interactive_3d
 *
 * ========================================================== */
/* eslint-disable */
export function Jq3d ($) {

  var defaults = {
    frames: 10,
    cursor: 'move',
    speed: 0,
    entrance: true,
    preloadImages: true,
    touchSupport: true,
    loading: 'Loading..',
    autoPlay: false
  }

  var imgArrIndex = 0

  function touchHandler (event) {
    var touch = event.changedTouches[0]

    var simulatedEvent = document.createEvent('MouseEvent')
    simulatedEvent.initMouseEvent({
        touchstart: 'mousedown',
        touchmove: 'mousemove',
        touchend: 'mouseup'
      }[event.type], true, true, window, 1,
      touch.screenX, touch.screenY,
      touch.clientX, touch.clientY, false,
      false, false, false, 0, null)
    touch.target.dispatchEvent(simulatedEvent)
  }

  $.fn.preload = function (el) {
    $('<div class="images_cache"></div>').hide().appendTo(el)
    this.each(function () {
      $('<img/>').attr('src', this).appendTo('.images_cache')
    })
  }

  $.fn.drags = function (settings) {
    var $el = this
    var imgArr = settings.imgArr
    return $el.css('cursor', settings.cursor).on('mousedown', function (e) {
      var $drag = $(this).addClass('draggable')
      // var cur_pos = e.pageX
      var last_position = {}

      $drag.parents().on('mousemove', function (e) {
        if ($('.draggable').length > 0) {
          var src = $el.find('img.main-frame').attr('src')
          var cur_frame = imgArrIndex
          // console.log('========', Math.floor(cur_frame), imgArr.length)
          if (Math.floor(cur_frame) < 0) {
            imgArrIndex = 0
            cur_frame = imgArrIndex
          }
          if (Math.floor(cur_frame) > Math.floor(imgArr.length)) {
            imgArrIndex = Math.floor(imgArr.length)
            cur_frame = imgArrIndex
          }

          if (typeof(last_position.x) != 'undefined') {
            //get the change from last position to this position
            var deltaX = last_position.x - e.clientX
            var deltaY = last_position.y - e.clientY

            if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) {
              if (Math.floor(cur_frame) > 1) {
                setTimeout(function () {
                  console.log('state1')
                  if (imgArr[Math.floor(cur_frame) - 1]) {
                    $el.find('img.main-frame').attr('src', imgArr[Math.floor(cur_frame) - 1])
                    imgArrIndex = imgArrIndex - 1
                  } else {
                    $el.find('img.main-frame').attr('src', imgArr[Math.floor(cur_frame)])
                    imgArrIndex = Math.floor(imgArr.length)
                  }
                  // console.log('state1', cur_frame)
                }, settings.speed)
              } else {
                setTimeout(function () {
                  console.log('state2')
                  // console.log('state2', cur_frame, imgArr[Math.floor(imgArr.length) - 1])
                  imgArrIndex = Math.floor(imgArr.length)
                  cur_frame = imgArrIndex
                  $el.find('img.main-frame').attr('src', imgArr[Math.floor(cur_frame)])
                }, settings.speed)

              }
            } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) {
              if (Math.floor(cur_frame) < Math.floor(imgArr.length)) {
                setTimeout(function () {
                  console.log('state3', imgArrIndex)
                  // console.log('state3', cur_frame, imgArr[Math.floor(cur_frame) + 1])
                  if (imgArr[Math.floor(cur_frame) + 1]) {
                    $el.find('img.main-frame').attr('src', imgArr[Math.floor(cur_frame) + 1])
                    imgArrIndex = imgArrIndex + 1
                  } else {
                    $el.find('img.main-frame').attr('src', imgArr[Math.floor(cur_frame)])
                    imgArrIndex = 0
                  }
                }, settings.speed)
              } else {
                setTimeout(function () {
                  console.log('state4')
                  // console.log('state4', cur_frame, imgArrIndex)
                  $el.find('img.main-frame').attr('src', imgArr[Math.floor(cur_frame)])
                  imgArrIndex = 0
                }, settings.speed)
              }
            }
          }
          last_position = {
            x : e.clientX,
            y : e.clientY
          }
        }
        $('.draggable').on('mouseup', function () {
          $(this).removeClass('draggable')
          console.log('in 1')
        })
      })
      e.preventDefault()  // disable selection
    }).on('mouseup', function (e) {
      $(this).removeClass('draggable')
      console.log('in 2')
    })
  }

  $.fn.interactive_3d = function (options) {
    var settings = $.extend({}, defaults, options)
    var el = $(this)
    el.find(' > img').addClass('main-frame')
    el.drags(settings)
    var imgArr = settings.imgArr
    var x = 0
    var step = 100 / Math.floor(imgArr.length)
    var cur_frame = imgArrIndex

    function animate_3d () {
      // console.log('animate_3d')
      var src = el.find('img.main-frame').attr('src')
      el.find('img.main-frame').css('opacity', (x * step) / 100)
      if (Math.floor(cur_frame) < Math.floor(imgArr.length)) {
        setTimeout(function () {
          el.find('img.main-frame').attr('src', imgArr[Math.floor(cur_frame) + 1])
          imgArrIndex = imgArrIndex + 1
        }, settings.speed)
      } else {
        setTimeout(function () {
          el.find('img.main-frame').attr('src', imgArr[0])
          imgArrIndex = 0
        }, settings.speed)
      }
      if (x++ < (Math.floor(imgArr.length) - 1)) {
        if (settings.autoPlay != false) {
          setTimeout(animate_3d, 0)
        } else {
          setTimeout(animate_3d, (x * 1.5))
        }
      }
    }

    if (settings.entrance == true && settings.autoPlay == false ) {
      if (settings.loading == false && settings.autoPlay == false) animate_3d()
    }

    if (settings.touchSupport == true) {
      document.addEventListener('touchstart', touchHandler, true)
      document.addEventListener('touchmove', touchHandler, true)
      document.addEventListener('touchend', touchHandler, true)
      document.addEventListener('touchcancel', touchHandler, true)
      // document.addEventListener('touchstart', touchStart, false)
    }

    if (settings.preloadImages == true) {
      var src = el.find('img.main-frame').attr('src')
      var arr = []
      // for (var i = 1; i < Math.floor(imgArr.length) + 1; i++) {
      //   var img_name = src.split('/')[src.split('/').length-1]
      //   var directory = src.split('/').slice(0, -1).join('/')
      //   arr.push(directory + '/' + img_name.split('_')[0] + '_' + i + '.' + img_name.split('.')[1])
      // }
      $(imgArr).preload(el)

      if (settings.loading != false) {
        var imgs = $('.images_cache > img').not(function () { return this.complete })
        var count = imgs.length
        el.append('<div class="loading_3d">' + settings.loading + '</div>')
        el.find('.main-frame').css('visibility', 'hidden')
        if (count) {
          el.find('.main-frame').css('visibility', 'visible')
          el.find('.loading_3d').remove()
          if (settings.autoPlay == false) animate_3d()
          // imgs.load(function () {
          //   count--
          //   if (!count) {
          //     el.find('.main-frame').css('visibility', 'visible')
          //     el.find('.loading_3d').remove()
          //     if (settings.autoPlay == false) animate_3d()
          //   }
          // })

          // var defereds = []
          //
          // $imgs.each(function () {
          //   var dfd = $.Deferred()
          //
          //   $(this).load(dfd.resolve)
          //   defereds.push(dfd)
          // })
          // $.when.apply(null, defereds).done(function () {
          //   console.log('load compeleted')
          // })
        } else {
          el.find('.main-frame').css('visibility', 'visible')
          el.find('.loading_3d').remove()
          if (settings.autoPlay == false) animate_3d()
        }
      }
    }

    if (settings.autoPlay != false) {
      function intervalTrigger () {
        return window.setInterval( function () {
          animate_3d()
        }, settings.autoPlay)
      }

      var id = intervalTrigger()

      el.mouseenter(function () {
        window.clearInterval(id)
      }).mouseleave(function () {
        id = intervalTrigger()
      })
    }
  }
}
