<template>
  <div>
    <p>{{$route.params.id}}</p>
    <p><router-link :to="'/vueroutertest/' + $route.params.id + '/profile'">show profile</router-link></p>
    <p><router-link :to="'/vueroutertest/' + $route.params.id + '/posts'">show posts</router-link></p>
    <p><router-link to="/vueroutertest/1/threedemo1">show threedemo1</router-link></p>
    <div><router-link to="/">go back</router-link></div>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<style scoped></style>

<script>
  export default {
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>
