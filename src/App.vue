<template>
  <div id="app">
    <img src="./assets/logo.png">
    <transition name="slide-left">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.slide-left-enter-active, .slide-left-leave-active {
  /*transition: opacity .5s*/
  transition: all 0.5s ease;
  -webkit-transition: all 0.5s ease;
}
.slide-left-enter {
  transform: translateX(100%);
  -ms-transform: translateX(100%);
  -webkit-transform: translateX(100%);
  -o-transform: translateX(100%);
  -moz-transform: translateX(100%);
}
.slide-left-leave-to {
  /*opacity: 0*/
  transform: translateX(0%);
  -ms-transform: translateX(0%);
  -webkit-transform: translateX(0%);
  -o-transform: translateX(0%);
  -moz-transform: translateX(0%);
}
</style>
