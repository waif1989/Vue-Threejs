// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App'
// import router from './router'

Vue.config.productionTip = false

const LazyLoadComponent = resolve => {
  require.ensure(['@/components/AsyncComponent'], () => {
    resolve(require('@/components/AsyncComponent'))
  })
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  template: '<Lazy/>',
  components: {
    Lazy: LazyLoadComponent
    // App
  }
})
