<template>
  <div>
    <p>hello jquery3D</p>
    <div>
      <router-link to="/">go back</router-link>
    </div>
    <div class="wrapper">
      <div class="main">
        <div class="page_container">
          <div id="i3d" class="interactive_3d">
            <img :src="img1">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .wrapper {
    margin: 0 auto;
  }

  a {
    text-decoration: none;
  }


  h1, h2 {
    width: 100%;
    float: left;
  }
  h1 {
    margin-top: 100px;
    color: #6D461D;
    margin-bottom: 5px;
    font-size: 70px;
    letter-spacing: -4px;
  }
  h2 {
    color: #808080;
    font-weight: 100;
    margin-top: 0;
    margin-bottom: 10px;
  }

  .pointer {
    color: #9b59b6;
    font-family: 'Pacifico', cursive;
    font-size: 30px;
    margin-top: 15px;
  }
  pre {
    margin: 80px auto;
  }
  pre code {
    padding: 35px;
    border-radius: 5px;
    font-size: 15px;
    background: rgba(0,0,0,0.1);
    border: rgba(0,0,0,0.05) 5px solid;
    max-width: 500px;
  }


  .main {
    float: left;
    width: 100%;
    margin: 0 auto;
  }

  .main h1 {
    padding:20px 0px;
    float: none;
    width: auto;
    font-size: 50px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    font-weight: 100;
    color: black;
    margin: 0;
    margin-top: 150px;
    letter-spacing: -1px;
  }

  .main h1.demo1 {
    background: #1ABC9C;
  }

  .reload.bell {
    font-size: 12px;
    padding: 20px;
    width: 45px;
    text-align: center;
    height: 47px;
    border-radius: 50px;
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
  }

  .reload.bell #notification {
    font-size: 25px;
    line-height: 140%;
  }

  .reload, .btn{
    display: inline-block;
    border: 4px solid #08C;
    border-radius: 5px;
    text-align: center;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    background: #08C;
    display: inline-block;
    line-height: 100%;
    padding: 0.7em;
    text-decoration: none;
    color: #fff;
    width: 100px;
    line-height: 140%;
    font-size: 17px;
    font-family: open sans;
    font-weight: bold;
    width: 200px;
  }
  .btn:hover{
    background: #12AEFC;
  }
  .clear {
    width: auto;
  }
  .credit {
    text-align: left;
    color: #000;
    padding: 10px 0;
    margin: 0 0 40px 0;
    float: left;
    width: 100%;
  }
  .credit a {
    color: #08C;
    text-decoration: none;
    font-weight: bold;
  }

  .back {
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    display: block;
    padding: 7px;
    width: 100%;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    background: rgba(0, 0, 0, 0.05);
    font-weight: bold;
    font-size: 13px;
    color: #000;
    -webkit-transition: all 200ms ease-out;
    -moz-transition: all 200ms ease-out;
    -o-transition: all 200ms ease-out;
    transition: all 200ms ease-out;
  }
  .back:hover {
    background: rgba(0, 0, 0, 0.15);
  }
  .main{
    margin: 50px auto;
  }
  .page_container {
    overflow:hidden;
    max-width: 1000px;
    margin: 0 auto;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    padding: 40px 20px;
    background: white;
  }
  .page_container .interactive_3d {
    position: relative;
  }
  .page_container .interactive_3d > img{
    position: relative;
    display: block;
    width: 90%;
    margin: auto;
    /*float: left;*/
    /*left: 0;*/
    /*width: 333px;*/
  }
  .caption {
    float: right;
    width: 555px;
    text-align: left;
  }
  @media screen and (max-width: 948px) {
    .caption {
      width: 100%;
      float: left;
      text-align: center;
      padding: 0 25px;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      margin-bottom: 45px;
    }
    .main h1 {
      margin-top: 15px;
    }
    .credit {
      text-align: center;
    }
    .page_container .interactive_3d > img {
      width: 100%;
      max-width: 333px;
      float: none;
    }
  }
</style>
<script>
  /* eslint-disable */
  import $ from 'jquery'
  import frame_1 from '../assets/models/jq3d-images/frame_1.png'
  import { Jq3d } from '../jslib/lib/jquery.interactive_3d'
  export default{
    data () {
      return {
        img1: frame_1,
        msg: 'hello vue'
      }
    },
    components: {},
    mounted () {
      // console.log('----', Jq3d)
      // console.log('++++', $)
      const imgArr = []
      for (let i = 0; i < 37; i++) {
        imgArr[i] = require(`../assets/models/jq3d-images/frame_${ i + 1 }.png`)
      }
      const head = document.getElementsByTagName('head')[0]
      const imagesURL = '/jq3d-images/interactive_3d.png'
      const linkTag = document.createElement('link')
      linkTag.setAttribute('rel', 'image_src')
      linkTag.href = imagesURL
      head.appendChild(linkTag)
      Jq3d($)
      $('#i3d').interactive_3d({
        frames: 38,
        imgArr: imgArr
      })
    }
  }
</script>
