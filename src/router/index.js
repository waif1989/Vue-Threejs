import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Three from '@/components/Threejs1'
import Three2 from '@/components/Threejs2'
import Vueroutertest from '@/components/VueRouterTest'
import UserProfile from '@/components/VueRouterChildrenTest/UserProfile'
import UserPosts from '@/components/VueRouterChildrenTest/UserPosts'
import Vuerouterfinishgetdata from '@/components/VueRouterFinishGetData'
import Vuerouterbeforegetdata from '@/components/VueRouterBeforeGetData'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      // THREEJS Official Demo1(THREEJS官方实例1)
      path: '/threejs1',
      name: 'ThreeDemo1',
      component: Three
    },
    {
      // THREEJS Divide Demo2(THREEJS分离实例)
      path: '/threejs2',
      name: 'ThreeDemo2',
      component: Three2
    },
    {
      // Alias router name,'/routerA' == '/routerB'(路由别名)
      path: '/routerA',
      component: Three,
      alias: '/routerB'
    },
    {
      // Redirection(重定向)
      path: '/a',
      redirect: { name: 'ThreeDemo1' }
    },
    {
      // Router with parameter(路由带参数)
      path: '/vueroutertest/:id',
      name: 'Vueroutertest',
      component: Vueroutertest,
      // Children-router(子路由)
      children: [
        {
          path: 'profile',
          component: UserProfile
        },
        {
          path: 'posts',
          component: UserPosts
        },
        {
          path: 'threedemo1',
          redirect: { name: 'ThreeDemo1' }
        }
      ]
    },
    {
      // RouterFinishGetData(导航完成后获取数据)
      path: '/vuerouterfinishgetdata',
      name: 'Vuerouterfinishgetdata',
      component: Vuerouterfinishgetdata
    },
    {
      // RouterBeforeGetData(导航完成前获取数据)
      path: '/vuerouterbeforegetdata',
      name: 'Vuerouterbeforegetdata',
      component: Vuerouterbeforegetdata
    }
  ]
})
