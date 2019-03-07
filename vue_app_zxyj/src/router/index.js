import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '../components/tabbar/Home.vue'
import goodsinfo from "../components/goods/goodsinfo.vue"
import Login from "../components/home/Login.vue"
import Type from "../components/goods/Type.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',redirect: '/Home'},
    {path:"/Home",component:Home},
    {path:"/goodsinfo",component:goodsinfo},
    {path:"/Login",component:Login},
    {path:"/Type",component:Type}
  ]
})
