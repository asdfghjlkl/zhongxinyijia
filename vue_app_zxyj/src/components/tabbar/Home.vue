<template>
    <div class="app-Home">
        <!--顶部搜索-->
        <div class="search">
            <input type="text" placeholder="搜索商品，了解更多" class="input">
                <img src="../../img/home/search.png" class="iem">
                <img src="../../img/home/xiaoxi@2x.png" class="xiaoxi">
            </input>
        </div>

        
        <!--轮播-->
        <mt-swipe :auto="3000">
            <mt-swipe-item v-for="item in list" :key="item.id">
                <img :src="item.img_url">
            </mt-swipe-item>
        </mt-swipe>

        <!--九宫格-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
                <router-link to=""> 
                <img src="../../img/home/swiper1.png" />
                <div class="mui-media-body">领券</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
                <router-link to="">
                <img src="../../img/home/swiper2.png" />
                <div class="mui-media-body">3C数码</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
                <router-link to="">
                <img src="../../img/home/swiper3.png" />
                <div class="mui-media-body">易家自营</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
                <router-link to="">
                <img src="../../img/home/swiper4.png" />
                <div class="mui-media-body">茅台酒</div>
                </router-link>
            </li>
        </ul>


        <!--每周精选-->
        <div class="weekly">
            <div class="week-title">
                <img src="../../img/home/title-left.png">
                <span>每周精选</span>
                <img src="../../img/home/title-right.png">
            </div>
            <div class="week-product">
                <a href="" class="pro-img">
                    <img src="../../img/home/guanggao-1.jpg">
                </a>
                <div class="pro-info">
                    <div class="pro-name">日本Diem植物精粹漱口水500ml</div>
                    <div class="pro-title">【源自天然】植物美容精华</div>
                    <div class="pro-price">￥128</div>
                </div>
            </div>
            <div class="week-product">
                <a href="" class="pro-img">
                    <img src="../../img/home/guanggao-2.jpg">
                </a>
                <div class="pro-info">
                    <div class="pro-name">美旅软箱万向轮拉杆箱 BG6</div>
                    <div class="pro-title">【出行助手】大容量 防刮耐磨</div>
                    <div class="pro-price">￥499</div>
                </div>
            </div>
            <div class="floor-container">
                <div class="floor-img">
                    <img src="../../img/home/middle1.png">
                </div>
                <div class="floor-content">
                    <ul class="floor-list">
                        <li class="floor-item" v-for="item in rows" :key="item.id">
                            <img :src="item.img_url">
                            <div class="pro-title">{{item.title}}</div>
                            <div class="pro-price">￥{{item.price}}</div>
                        </li>
                        <li class="more">
                            <div class="pro-title">more</div>
                            <div class="pro-title">查看更多</div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="floor-container">
                <div class="floor-img">
                    <img src="../../img/home/middle2.png">
                </div>
                <div class="floor-content">
                    <ul class="floor-list">
                        <li class="floor-item">
                            <img src="../../img/home/middle1-1.jpg">
                            <div class="pro-title">花语系列项链</div>
                            <div class="pro-price">￥2150</div>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </div>
        <div class="love-found">
            <div class="found-title">
                <img src="../../img/home/title-left.png">
                <span>爱发现</span>
                <img src="../../img/home/title-right.png">
            </div>
            <div class="found-list">
                <div class="found-item" v-for="item in list1">
                    <img :src="item.img_url">
                    <div class="found-detail">
                        <span class="found-title">{{item.title}}</span>
                        <p class="found-subtitle">{{item.subtitle}}</p>
                        <div class="keywords">
                            <span>{{item.keywords1}}</span>
                            <span>{{item.keywords2}}</span>
                        </div>
                        <p class="found-price">￥{{item.price}}</p>
                    </div>
                </div>
                <div class="nomore">没有更多了~</div>
            </div>
        </div>
        <div class="copyright">
            <p>Copyright©2016-2017中信易家版权所有</p>
            <p>食品经营许可证编号  JY11105050876919</p>
            <p>京ICP备17008530号-3</p>
        </div>
        <div class="footer"></div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            list:[],
            list1:[],
            input: '',
            rows:[]
        }
    },
    methods: {
        handleImage(){
            //1:发送ajax请求给服务器
            var url="http://127.0.0.1:3000/imageList";
            this.axios.get(url).then(result=>{
                this.list=result.data;
            })
            //2：接收服务器返回结果
            //3：将结果保存list
        },
        firstFloor(){
            var url="http://127.0.0.1:3000/pro1"
            this.axios.get(url).then(result=>{
                this.rows=result.data.data;
            })
        },
        handleFound(){
            var url="http://127.0.0.1:3000/found"
            this.axios.get(url).then(result=>{
                this.list1=result.data.data;
            })
        }
    },
    created() {
        this.handleImage();
        this.firstFloor();
        this.handleFound();
    },
}
</script>
<style>
/*搜索框 */
.body{
    background-color:#fff;
}
.search{
    width:100%;
    display:fixed;
}
.search .input{
    width:85%;
    margin:6px 10px;
    height:40px;
    border-radius:8px;
    border:0px;
    background-color:#eee;
    position:relative;
    font-size:15px;
    color:#999;
    padding-left:40px;
}
.iem{
    position:absolute;
    width:20px;
    height:20px;
    left:20px;
    top:16px;
}
.xiaoxi{
    position:absolute;
    top:13px;
    right:12px;
    width:26px;
    height:26px;

}
.el-input__inner:hover{
    border:0px;
}
 /*轮播图 */
.app-Home .mint-swipe{
    height:275px;
}
.app-Home .mint-swipe img{
    width:100%;
}   
.mui-grid-view.mui-grid-9 .mui-media,.week-title{
    background-color:#fff;
    border:none;
}
.mui-grid-view.mui-grid-9{
    border:none;
}
.mui-table-view-cell img{
    width:80%;
    height:80%;
}
.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
    font-size:12px;
    font-weight:bold;
}
/*每周精选 */
.weekly,.love-found{
    text-align:center;
    background-color:#fff;
}
.weekly span,.love-found span{
    padding:0px 5px;
    display:inline-block;
    line-height:20px;
}
.week-title,.found-title{
    padding-top:10px;
    padding-bottom:25px;
    border:none;
    vertical-align:middle;
}
.weekly .week-title img,.love-found .found-title img{
    width:45px;
    height:6px;
}
.app-Home .mui-grid-view.mui-grid-9:after
{
    display: none;
}
/*每周精选产品 */
.week-product{
    width:100%;
}
.week-product .pro-img img{
    width:100%;
}
.pro-info{
    padding:10px 10px;
    line-height:20px;
    font-size:12px;
}
.pro-info .pro-name{
    font-weight:bold;
}
.pro-info .pro-price{
    color:red;
    padding-bottom:5px;
}
/* 楼层图片 */
.floor-container{
    width:100%;
}
.floor-container .floor-img img{
    width:100%;
}
/*产品列表 */
.floor-list{
    display:flex;
    list-style:none;
    padding:10px;
    margin:0px;
    overflow:hidden;
}
.floor-list .floor-item{
    width:120px;
    margin-right:10px;
}
.floor-list .floor-item img{
    width:120px;
    height:120px;
}
.floor-list .floor-item .pro-title{
    font-size:8px;
    margin-top:5px;
}
.floor-list .floor-item .pro-price{
    font-size:8px;
    color:red;
    margin-top:15px;
}
/*爱发现 */
.found-list .found-item{
    display:flex;
    margin-bottom:10px;
}
.found-list .found-item>img{
    width:140px;
    height:140px;
    display:inline-block;
    padding:10px;
}
.found-list .found-item .found-title{
    font-size:14px;
}
.found-detail{
    text-align:left;
}
.found-title{
    color:#333;
}
.found-subtitle{
    font-size:10px;
    color:#666;
    padding-left:10px;
    margin-top:5px;
}
.keywords{
    font-size:10px;
    margin-top:20px;
}
.keywords span{
    background-color:#FAF2E6;
    color:#87644B;
    border-radius:10px;
    padding:0 8px;
    margin:0 8px;
}
.found-price{
    font-size:12px;
    color:red;
    margin:10px 10px;
}
.nomore{
    font-size:12px;
    color:#666;
    padding:10px;
}
/*授权 */
.copyright{
    text-align:center;
    margin:25px;
}
.copyright p{
    font-size:8px;
    color:#666;
    line-height:10px;
}
/*底部 */
.footer{
    height:50px;
}

</style>