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
import Vuelonglist from '@/components/vueLongList'

Vue.use(Router)

const LazyLoadComponent = resolve => {
  require.ensure(['@/components/VueRouterLazy'], () => {
    resolve(require('@/components/VueRouterLazy'))
  })
}

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    console.log('to.savedPosition')
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    const position = {}
    console.log('to.position')
    // new navigation.
    // scroll to anchor by returning the selector
    if (to.hash) {
      console.log('to.hash')
      position.selector = to.hash
    }
    // check if any matched route config has meta that requires scrolling to top
    if (to.matched.some(m => m.meta.scrollToTop)) {
      console.log('to.matched')
      // cords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0
      position.y = 0
    }
    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    return position
  }
}

export default new Router({
  mode: 'history', // when use scrollBehavior the mode must be setted 'history'
  scrollBehavior,
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
      // Test scroll position
      path: '/vuelonglist',
      name: 'Vuelonglist',
      component: Vuelonglist,
      meta: { scrollToTop: true }
    },
    {
      // Test lazyload router(异步加载路由组件)
      path: '/lazyloadcomponent',
      name: 'LazyLoadComponent',
      component: LazyLoadComponent
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
