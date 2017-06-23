<template>
  <div>
    <p>{{msg}}</p>
    <div><router-link to="/">go back</router-link></div>
  </div>
</template>

<style scoped></style>

<script>
  export default {
    data () {
      return {
        msg: 'Vue Lazy Router'
      }
    }
  }
</script>
