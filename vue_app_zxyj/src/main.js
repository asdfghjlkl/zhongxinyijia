import Vue from 'vue'
import App from './App.vue'
import router from './router'

//1.引入mint-ui 样式文件
import 'mint-ui/lib/style.css'

Vue.config.productionTip = false
//2.引入 mui库样式文件
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
//3.引入mint-ui组件 Header
import {Button,Header,Swipe,SwipeItem} from "mint-ui"
////3.引入element-ui组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//4注册Header组件
Vue.component(Header.name,Header);
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);
Vue.component(Button.name,Button)
//5引入axios库   52
import axios from "axios"
//6配置跨域访问保存session
axios.defaults.withCredentials=true;
//7将axios库配置Vue实例对象中
Vue.prototype.axios=axios;
//7.1加载qs模块
import qs from "qs"
//7.2配置qs模块成为Vue属性
Vue.prototype.qs=qs;
Vue.filter("datetimeFilter",function(val){
  //创建日期对象
  var date=new Date(val);
  //获取年月日时分秒
  var y=date.getFullYear();
  var m=date.getMonth()+1;
  var d=date.getDate();
  var h=date.getHours();
  var mi=date.getMinutes();
  var s=date.getSeconds();
  //返回字符串 y-m-d h:mi:s
  m<10&&(m="0"+m)
  d<10&&(d="0"+d)
  return `${y}-${m}-${d} ${h}:${mi}:${s}`
})
Vue.filter("dateFilter",function(val){
  var date=new Date(val);
  var y=date.getFullYear();
  var m=date.getMonth()+1;
  var d=date.getDate();
  return `${y}-${m}-${d}`;
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

