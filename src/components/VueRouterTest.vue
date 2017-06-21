<template>
  <div>
    <p>{{$route.params.id}}</p>
    <p><router-link to="/vueroutertest/1/profile">show profile</router-link></p>
    <p><router-link to="/vueroutertest/1/posts">show posts</router-link></p>
    <div><router-link to="../">go back</router-link></div>
    <router-view></router-view>
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
