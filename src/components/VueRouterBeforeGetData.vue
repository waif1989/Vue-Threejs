<template>
  <div class="post">
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="post" class="content">
      <h2>{{ post.items[0].text }}</h2>
    </div>
    <div><router-link to="/">go back</router-link></div>
  </div>
</template>
<style scoped>
  body {
    background-color: #ff0000;
  }
</style>
<script>
  import Http from '../jslib/utils/fetch'
  export default {
    data () {
      return {
        loading: true,
        error: null,
        post: null
      }
    },
    beforeRouteEnter (to, from, next) {
      Http.get('http://210.21.62.118:8082/common-main-mapp/newIndex-mapi/common/getAtricleInfo', {}, { isForm: true }).then((data) => {
        console.log('++++++++', data)
        next(vm => {
          vm.post = data['COMMON-ZXTT-01']
          vm.loading = false
        })
      }, (e) => {
        next(vm => {
          vm.error = e
          vm.loading = false
        })
        throw e
      }).catch((e) => {
        console.log(e)
      })
    },
    watch: {
      $route () {
        this.post = null
        Http.get('http://210.21.62.118:8082/common-main-mapp/newIndex-mapi/common/getAtricleInfo', {}, { isForm: true }).then((data) => {
          console.log('********', data)
          this.post = data['COMMON-ZXTT-01']
          this.loading = false
        }, (e) => {
          this.error = e
          this.loading = false
          throw e
        }).catch((e) => {
          console.log(e)
        })
      }
    },
    created () {
    },
    methods: {
    }
  }
</script>
