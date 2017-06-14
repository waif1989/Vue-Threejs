import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Three from '@/components/Threejs1'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/threejs1',
      name: 'Three',
      component: Three
    }
  ]
})
