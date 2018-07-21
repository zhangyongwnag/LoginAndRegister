import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/pages/index'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:{
        name:'index'
      }
    },
    {
      path:'/index',
      name:'index',
      component:index,
      meta:{
        title:'首页',
      },
    },
    {
      path:'/Login',
      name:'Login',
      component:Login,
      meta:{
        title:'登录'
      }
    },
    {
      path:'/Register',
      name:'Register',
      component:Register,
      meta:{
        title:'注册'
      }
    },
    {
      path:'/Home',
      name:'Home',
      component:Home,
      meta:{
        title:'首页'
      }
    }
  ]
})
