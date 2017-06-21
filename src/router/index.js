import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Three from '@/components/Threejs1'
import Three2 from '@/components/Threejs2'
import Vueroutertest from '@/components/VueRouterTest'
import UserProfile from '@/components/VueRouterChildrenTest/UserProfile'
import UserPosts from '@/components/VueRouterChildrenTest/UserPosts'


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
    },
    {
      path: '/threejs2',
      name: 'Three2',
      component: Three2
    },
    {
      path: '/vueroutertest/:id',
      name: 'Vueroutertest',
      component: Vueroutertest,
      children: [
        {
          path: 'profile',
          component: UserProfile
        },
        {
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
