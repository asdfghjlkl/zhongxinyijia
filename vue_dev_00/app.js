//app.js
//1:加载模块 express pool.js
const express = require("express");
const pool = require("./pool");
//2:创建服务器端对象
var app = express();
//3:监听 3000
app.listen(3000);
//4:指定静态目录  public 
app.use(express.static("public"));
//5:加载跨域访问模块
const cors = require("cors");
//6:配置跨域访问模块 那个域名跨域访问允许
//  脚手架8080允许
//origin      允许跨域访问域名列表
//credentials 跨域访问保存session id
app.use(cors({
  origin:["http://127.0.0.1:8080",
  "http://localhost:8080"],
  credentials:true
}));  
//6.1下载express-session 并且配置
const session=require("express-session");
app.use(session({
  secret:"128位随机字符",//安全字符串
  resave:false,//每次请求是否都更新数据
  saveUninitialized:true,//初始化时保存数据
  cookie:{
    maxAge:1000*60*60*8
  }
}));
//7加载第三方模块body-parser
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:false}))

//功能一:home 组件轮播图片  
app.get("/imageList",(req,res)=>{
   //1:将轮播图中所需图片 复制public/img
   //2:查询
   var list = [
     {id:1,img_url:"http://127.0.0.1:3000/img/home/banner1.jpg"},
     {id:2,img_url:"http://127.0.0.1:3000/img/home/banner2.jpg"},
   ];
   res.send(list); 
});

//功能二：每周精选
app.get("/pro1",(req,res)=>{
  var id=req.query.id
  var sql="select * from zx_pro1"
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result})
  })
})

//功能三：爱发现
app.get("/found",(req,res)=>{
  var id=req.query.id
  var sql="select * from zx_prolist"
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result})
  })
})

//功能四：登录
app.get("/Login",(req,res)=>{
  var phone=req.query.phone
  var upwd=req.query.upwd
  var sql="select uid from zx_user where phone=? and upwd=?"
  pool.query(sql,[phone,upwd],(err,result)=>{
    if (err) throw err;
    if(result.length>0){
      var id=result[0].uid
      req.session.uid=id;
      res.send({code:1,msg:"登录成功"})
    }else{
      res.send({code:-1,msg:"用户名或密码错误"})
    }
  })
})


/*

//功能二:获取新闻列表分页显示
//xz_news表 20 条数据 7行一页  三页
//1:请求参数  pno 页码 pageSize 页大小
//2:哪条sql
// SELECT id,title,img_url,ctime,point
// FROM xz_news
// LIMIT ?,?
//3:返回数据结果json
//  {code:1,data:[]} 
app.get("/newsList",(req,res)=>{
  //1:获取参数 pno pageSize
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  //2:设置默认值  pno 1 pageSize 7
  if(!pno){
    pno = 1;
  }
  if(!pageSize){
    pageSize = 7;
  }
  //3:创sql语句
  var sql = " SELECT id,title,img_url";
  sql +=" ,ctime,point";
  sql +=" FROM xz_news";
  sql +=" LIMIT ?,?";
  var ps = parseInt(pageSize);
  var offset = (pno-1)*pageSize;
  pool.query(sql,[offset,ps],(err,result)=>{
     if(err)throw err;
     res.send({code:1,data:result});
  })
  //4:返回 
})
app.get('/products',(req,res)=>{
  //1:参数
  var pno=req.query.pno;
  var pageSize=req.query.pageSize;
  //2：允许使用默认值 1 7
  if(!pno){pno=1}
  if(!pageSize){pageSize=7}
  //sql
  var sql="select l.lid,l.title,l.price,p.md";
      sql+=" from xz_laptop l,xz_laptop_pic p";
      sql+=" where l.lid=p.laptop_id";
      sql+=" group by l.lid";
      sql+=" limit ?,?";
  var ps=parseInt(pageSize);
  var offset=(pno-1)*pageSize;
  pool.query(sql,[offset,ps],(err,result)=>{
      if (err) throw err;
      res.send({code:1,data:result})
  })
})
//功能三：获取新闻详细信息
app.get("/findNewsInfo",(req,res)=>{
  //获取参数
  var id=req.query.id
  //创建正则表达式
  var reg=/^\d{1,}$/
  //如果验证失败，输出错误信息{code:-1}
  if(!reg.test(id)){
    res.send({code:-1,msg:"新闻编号格式有误"});
    return;
  }
  //创建sql
  var sql="select id,title,content,ctime";
      sql+=" ,img_url from xz_news";
      sql+=" where id=?"
  //发送sql语句
  pool.query(sql,[id],(err,result)=>{
    if(err) throw err
    res.send({code:1,data:result})
  })
  //输出查询结果{code:1}
})
//功能四，评论
//获取评论列表
app.get("/getComment",(req,res)=>{
  var nid=req.query.nid;
  var pno=req.query.pno;
  var pageSize=req.query.pageSize;
  if(!pno) {
    pno=1;
  }
  if(!pageSize) {
    pageSize=5;
  }
  var sql=" SELECT id,content,ctime,nid";
     sql+=" FROM xz_comment";
     sql+=" WHERE nid = ?";
     sql+=" LIMIT ?,?";
    var offset=(pno-1)*pageSize;
    pageSize=parseInt(pageSize);
    pool.query(sql,[nid,offset,pageSize],(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result});
   });
  })
  //功能五:发表评论
app.post("/addcomment",(req,res)=>{
    var nid=req.body.nid
    var content=req.body.content
    var sql="insert into xz_comment values(null,?,now(),?)"
    pool.query(sql,[content,nid],(err,result)=>{
      if(err) throw err;
      if(result.affectedRows>0)
      res.send({code:1,msg:"评论发表成功"})
      else
      res.send({code:1,msg:"评论发表失败"})
    })
  })

//7.查商品名称和价格
app.get("/findProduct",(req,res)=>{
  var pid=req.query.pid;
  var sql="SELECT lname,price"
  sql+="  FROM xz_laptop";
  sql+="  WHERE lid=?";
  pool.query(sql,[pid],(err,result)=>{
    if(err)  throw err;
    res.send({code:1,data:result});
  })
})
//8,用户登录
app.get("/login",(req,res)=>{
  var uname=req.query.uname;
  var upwd=req.query.upwd;
  var sql="select id from xz_login where uname=? and upwd=md5(?)";
  pool.query(sql,[uname,upwd],(err,result)=>{
    if(err) throw err
    if(result.length>0){
       //将登录凭证保存在服务器端session对象中
       var id=result[0].id//获取当前用户uid
       req.session.uid=id;//保存session
       //console.log(req.session.uid);
      res.send({code:1,msg:"登录成功"})                      
    }else{ 
      res.send({code:-1,msg:"用户名或密码错误"})
    }
  })
})

//9 将商品添加至购物车
app.get("/addcart",(req,res)=>{
  var uid=parseInt(req.query.uid)
  var pid=parseInt(req.query.pid)
  var count=1
  var uid=req.session.uid
  var price=parseInt(req.query.price)
  var sql="SELECT id from xz_cart where Uid=? AND pid=?"
  pool.query(sql,[uid,pid],(err,result)=>{
    if(err) throw err;
    if(result.length==0){
      var sql=`INSERT INTO xz_cart VALUES(null,1,${price},${pid},${uid})`;
    }else{
      var sql=`UPDATE xz_cart SET count=count+1 WHERE pid=${pid} AND uid=${uid}`;
    }
    pool.query(sql,(err,result)=>{
      if(err) throw err
      if(result.affectedRows>0){
        res.send({code:1,msg:"添加购物车成功"})
      }else{
        res.send({code:-1,msg:"添加购物车失败"})
      }
    })
  })
})
//功能十：购物车列表
app.get("/cartlist",(req,res)=>{
  //如果session对象中uid不存在
  //原因：当前没有登录
  if(!req.session.uid){
    res.send({code:-1,msg:"请登录"});
    return;
  }
  //参数uid
  var uid=req.session.uid;
  //sql多表查询
  var sql="select c.id,c.count,c.price,c.uid,c.pid,l.lname";
  sql+=" from xz_cart c,xz_laptop l where l.lid=c.pid and c.uid=?"
  pool.query(sql,[uid],(err,result)=>{
    if(err) throw err
    res.send({code:1,data:result})
  })
})

//功能十一：删除购物车中一件商品
app.get("/delCartItem",(req,res)=>{
  var id=req.query.id;
  var sql="DELETE FROM xz_cart WHERE id=?";
  pool.query(sql,[id],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"删除成功"});
    }else{
      res.send({code:-1,msg:"删除失败"});
    }
  })
})

//功能十二:删除购物车中的多个指定的商品
app.get("/removeMItem",(req,res)=>{
  var ids=req.query.ids;
  var sql="delete from xz_cart where id in("+ids+")"
  //http://127.0.0.1:3000/removeMItem?ids=2,5
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"删除成功"});
    }else{
      res.send({code:-1,msg:"删除失败"});
    }
  })
})

//功能十三：给小程序首页返回轮播数据
//1.将轮播保存 public/img/banner1.png
//2.get /imagelist
app.get("/imagelist2",(req,res)=>{
  var rows=[
    {code:1,img_url:"http://127.0.0.1:3000/img/banner1.png"},
    {code:2,img_url:"http://127.0.0.1:3000/img/banner2.png"},
    {code:3,img_url:"http://127.0.0.1:3000/img/banner3.png"},
    {code:4,img_url:"http://127.0.0.1:3000/img/banner4.png"}
  ];
  res.send(rows);
})
//3.创建js对象 图片编号 图片地址
//4.返回

//功能十四：返回小程序九宫格图片列表
app.get("/icons",(req,res)=>{
  //1.将九宫格图片复制 /public/icon/...
  var rows=[
    {id:1,img_url:"http://127.0.0.1:3000/icons/grid-01.png",title:"美食"},
    {id:2,img_url:"http://127.0.0.1:3000/icons/grid-02.png",title:"更多"},
    {id:3,img_url:"http://127.0.0.1:3000/icons/grid-03.png",title:"结婚"},
    {id:4,img_url:"http://127.0.0.1:3000/icons/grid-04.png",title:"卡拉ok"},
    {id:5,img_url:"http://127.0.0.1:3000/icons/grid-05.png",title:"找工作"},
    {id:6,img_url:"http://127.0.0.1:3000/icons/grid-06.png",title:"辅导班"},
    {id:7,img_url:"http://127.0.0.1:3000/icons/grid-07.png",title:"汽车保养"},
    {id:8,img_url:"http://127.0.0.1:3000/icons/grid-08.png",title:"租房"},
    {id:9,img_url:"http://127.0.0.1:3000/icons/grid-09.png",title:"装修"}
  ];
  res.send(rows);
})

//退出登录
app.get("/logout",(req,res)=>{
  req.session.uid=null
  res.send({code:1,msg:"退出成功"}) 
})
*/
