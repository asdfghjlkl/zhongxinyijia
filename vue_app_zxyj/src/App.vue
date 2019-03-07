<template>
  <div class="app-container">
    <!--1添加公共组件header-->
   <router-view></router-view>
    <!--添加公共组件tabbar-->
   <nav class="mui-bar mui-bar-tab">
      <a class="mui-tab-item mui-active" href="#tabbar">
         <span class="mui-icon"><img src="./img/home/tabar1-2.png"></span>
         <span class="mui-tab-label">首页</span>
      </a>
      <a class="mui-tab-item" href="#tabbar-with-chat">
         <span class="mui-icon"><img src="./img/home/tabar2-1.png"></span>
               <span class="mui-tab-label">分类</span>
      </a>
      <a class="mui-tab-item" href="#tabbar-with-contact">
         <span class="mui-icon"><img src="./img/home/tabar3-1.png"></span>
         <span class="mui-tab-label">购物车</span></span>
      </a>
      <a class="mui-tab-item" href="#tabbar-with-map">
         <span class="mui-icon"><img src="./img/home/tabar4-1.png"></span>
         <span class="mui-tab-label">个人</span>
      </a>
   </nav>
   
   <!---->
 </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.mui-icon img{
  width:100%;
  height:100%;
}
</style>

