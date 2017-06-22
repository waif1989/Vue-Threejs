/**
 * Created by chensiwei on 2017-5-24.
 * get请求示例:
 * Http.get('api/common-main-mapp/newIndex-mapi/index/main', {
      cityName: '广州市'
    },{
      isForm: true,
    }).then((data) => {
      console.log('******', data)
    }, (e) => {
      throw e
    }).catch((e) => {
      console.log(e)
    }))
 * post请求示例:
 * Http.post(Url.LEAVE_INFO, {
        name: '张三',
        phone: '13333333333',
        cityId: 123,
        cityName: '广州',
        shopName: '大圣科技门店',
        carModelId: 234,
        carModelName: '奥德赛',
        scheme: '方案一'
      },{
        isForm: false
      }).then((data) => {
        console.log('******', data)
      }, (e) => {
        throw e
      }).catch((e) => {
        console.log(e)
      })
 */
import headerInfo from '../config/headerInfo'
function* entries (obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]]
  }
}
const toQueryString = obj => {
  return obj ? Object.keys(obj).sort().map((key) => {
    let val = obj[key]
    if (Array.isArray(val)) {
      return val.sort().map((val2) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(val2)
      }).join('&')
    }
    return encodeURIComponent(key) + '=' + encodeURIComponent(val)
  }).join('&') : ''
}
export default {
  get (url, param, format) {
    return new Promise((resolve, reject) => {
      const headers = headerInfo
      let type = ''
      const obj = Object.assign({}, param)
      const f = Object.assign({}, format)
      if (typeof (f.isForm) === 'undefined') {
        type = 'application/x-www-form-urlencoded'
      } else if (f.isForm) {
        type = 'application/x-www-form-urlencoded'
      } else if (!f.isForm) {
        type = 'application/json'
      }
      let paramLocal = ''
      for (let [key, value] of entries(obj)) {
        paramLocal = paramLocal + `${key}=${encodeURIComponent(value)}&`
      }
      headers['Content-Type'] = type
      const init = {
        method: 'GET',
        headers: headers,
        mode: 'cors',
        cache: 'default'
      }
      const myRequest = new Request(`${url}?${paramLocal}`, init)
      fetch(myRequest).then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          return {
            code: '-1',
            data: {},
            msg: '服务器服务出错'
          }
        }
      }).then((data) => {
        if (data.code === '0000') {
          resolve(data.data)
        } else {
          reject(data)
        }
      })
    })
  },
  post (url, param, format) {
    return new Promise((resolve, reject) => {
      const headers = headerInfo
      let type = ''
      const obj = Object.assign({}, param)
      const f = Object.assign({}, format)
      if (typeof (f.isForm) === 'undefined') {
        type = 'application/x-www-form-urlencoded'
      } else if (f.isForm) {
        type = 'application/x-www-form-urlencoded'
      } else if (!f.isForm) {
        type = 'application/json'
      }
      headers['Content-Type'] = type
      let init = {}
      if (type === 'application/json') {
        init = {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(obj),
          mode: 'cors',
          cache: 'default'
        }
      } else if (type === 'application/x-www-form-urlencoded') {
        init = {
          method: 'POST',
          headers: headers,
          body: toQueryString(obj),
          mode: 'cors',
          cache: 'default'
        }
      }
      const myRequest = new Request(url, init)
      fetch(myRequest).then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          return {
            code: '-1',
            data: {},
            msg: '服务器服务出错'
          }
        }
      }).then((data) => {
        if (data.code === '0000') {
          resolve(data.data)
        } else {
          reject(data)
        }
      })
    })
  }
}
