import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import List from '../views/List.vue'
// import Detail from '../views/Detail.vue'
import Layout from '@/layout'; // 布局⻚

Vue.use(VueRouter)
// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home,
//     children: [
//       { path: "/list", name: "list", component: List },
//       // { path: "/detail/:id", name: "detail", component: Detail },
//       { path: "/detail/:id", name: "detail", component: Detail,props:true }
//     ]
//   },
//   {
//     path: '/about',
//     meta:{auth:true},
//     name: 'About',
//     // beforeEnter(){} 路由级钩子
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ]

export const constRoutes = [
  {
    path: "/login",
    component: () => import("@/views/Login"),
    hidden: true // 导航菜单忽略该项
  },
  {
    path: "/",
    component: Layout,// 应用布局
    redirect: "/home",
    meta: { title: '主页' },
    children: [
      {
        path: "home",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
        name: "home",
        meta: {
          title: "Home", // 导航菜单项标题
          icon: "qq" // 导航菜单项图标
        }
      },
      {
        path: "bla",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
        name: "bla",
        meta: {
          title: "blabla", // 导航菜单项标题
          icon: "wx" // 导航菜单项图标
        }
      }

    ]
  }
];
export const asyncRoutes = [
  {
    path: "/about",
    component: Layout,
    meta: { title: '副页' },
    redirect: "/about/index",
    children: [
      {
        path: "index",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/About.vue"),
        name: "about",
        meta: {
          title: "About",
          icon: "qq",
          // 角色决定将来那些用户可以看到该路由
          roles: ['admin', 'editor']
        },
      },
      {
        path: "foo",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/About.vue"),
        name: "foo",
        meta: {
          title: "foo",
          icon: "wx",
          // 角色决定将来那些用户可以看到该路由
          roles: ['admin']
        },
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constRoutes
})

// 全局守卫
// router.beforeEach((to, from, next) => {
//   if (to.meta.auth && !window.isLogin){
//     if(window.confirm('请登录')){
//       window.isLogin = true
//       next() //登录成功进行下一步
//     }else{
//       next('/') // 放弃，回首页
//     }
//   }else{
//     next() // 不需要登录
//   }
// })

// 动态路由
// 后台返回数据
//[{
// path: "/",
// name: "home",
// component: "Home", //Home
//}]

// 异步获取路由
// api.getRoutes().then(routes=>{
//   const routeConfig = routes.map(route=>mapComponent(route))
//   router.addRoutes(routeConfig)
// })
// // 映射关系
// const comMap ={
//   'Home':()=>import('../view/Home.vue')
// }
// // 递归替换
// function mapComponent(route){
//   route.component = comMap[route.component]
//   if(route.children){
//     route.children = route.children.map(child=>mapComponent(child))
//   }
//   return route
// }

// // 前端组件名和组件映射表
// const map = {
//   // login:require('login/index').default // 同步方式
//   login: () => import('login/index') //异步方式
// }
// //服务端返回的map类似于
// const serviceMap = [
//   { path: '/login', component: 'login', hidden: true }
// ]
// //遍历serviceMap，将component替换为map[component]，动态生成asyncRoutes
// function mapComponent(route) {
//   route.component = serviceMap[route.component];
//   if (route.children) {
//     route.children = route.children.map(child => mapComponent(child))
//   }
//   return route
// }

export default router
