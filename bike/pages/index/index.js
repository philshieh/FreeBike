//导包
var myUtil = require("../../utils/myUtil.js");

Page({
  data: {
    longitude: 0,
    latitude: 0,
    controls: [],
    markers:[],
  },
  //首次加载页面时 调用
  onLoad: function () {

    //获取当前页面参数
    var that = this;

    //获取当前地理位置
    wx.getLocation({
      success: function(res) {
        console.log(res);
        //获取当前位置的经度
        var longitude = res.longitude;
        //获取当前位置的纬度
        var latitude = res.latitude;
        //将数据传回页面对应参数里
        that.setData({
          longitude: longitude,
          latitude: latitude,
        })
        //查找附近的单车
         findBikes(longitude,latitude,that)
      },
    })

    //获取设备的高度和宽度
    wx.getSystemInfo({
      success: function(res) {
        //获取当前设备窗口高度
        var windowHeight = res.windowHeight;
        //获取当前设备窗口宽度
        var windowWidth = res.windowWidth;
        //给扫码开锁控件加上图片
        that.setData({
          //页面data里的控件名称 类型Array
          controls: [

            //扫码开锁按钮
            {
              id: 1,
              //控件背景图片
              iconPath: '/images/saomakaisuo.png',
              //控件大小和相对定位
              position: {
                width: 100,
                height: 40,
                left: windowWidth / 2 - 50,
                top: windowHeight - 60,
              },
              //是否可点击
              clickable: true,  
            },

            //重置定位按钮
            {
              id: 2,
              iconPath: '/images/resetLocation.png',
              position: {
                width: 40,
                height: 40,
                left: 10,
                top: windowHeight - 60,
              },
              //是否可点击
              clickable: true,
            },

            //中心位置按钮
            {
              id: 3,
              iconPath: '/images/mapCenter.png',
              position: {
                width: 20,
                height: 35,
                left: windowWidth / 2 - 10,
                top: windowHeight / 2 - 30,
              },
              //是否可点击
              clickable: true,
            },

            //充值按钮
            {
              id:4,
              iconPath:'/images/pay.png',
              position:{
                width: 40,
                height: 40,
                left: windowWidth - 45,
                top: windowHeight - 100,
              },
              //是否可点击
              clickable:true,    
            },

            //添加车辆
            {
              id: 5,
              iconPath: '/images/plusBike.png',
              position: {
                width: 35,
                height: 35,
              },
              //是否可点击
              clickable: true,
            },

            //报修按钮
            {
              id: 6,
              iconPath: '/images/warn.png',
              position: {
                width: 35,    
                height: 35,
                left: windowWidth - 42,
                top: windowHeight - 60,
              },
              //是否可点击
              clickable: true,
            }

          ]
        })   
      },
    })

  },

  //控件被点击事件函数
  controltap: function (e) {
    var cid = e.controlId;
    var that = this;

    if(cid == 1){
      //点击扫码开锁，检查用户登录状态

      //获取用户状态
      var status = myUtil.get("status");

      if(status == 0){
        //未注册
        wx.navigateTo({
          url: '../register/register',
        })
      }else if(status == 1){
        //已绑定手机
        wx.navigateTo({
          url: '../deposit/deposit',
        })
      }else if(status == 2){
        //已付押金
        wx.navigateTo({
          url: '../identify/identify',
        })
      }

    }
    
    if(cid == 2){
      //返回原来的位置
      this.mapCtx.moveToLocation()
    }

    if(cid == 5){
      //获取当前车辆信息
      var bikes = that.data.markers;
      //获取移动后位置的中心点
      this.mapCtx.getCenterLocation({
        success: function(res){
          //接收移动后中心点的经度和纬度
          var log = res.longitude;
          var lat = res.latitude;
          //在移动后的位置添加一辆单车
          bikes.push(
            {
              iconPath: '/images/bike.png',
              width: 35,
              height: 40,
              longitude: log,
              latitude: lat,
            }
          )   
          //重新加载车辆markers数据
            that.setData({
              markers: bikes,
            })

          //将添加的单车数据发送到后台
          wx.request({
            url: 'http://localhost:8080/bike/addBike',
            data: {
              // longitude: log,
              // latitude: lat,
              // bikeNum: 1000,
              location: [log,lat],
              status: 0,
            },
            method: 'POST',
            success: function (res) {
              //查找附近的单车
              findBikes(log,lat,that)
            }
          })
        }

      })




    }
  },

  //移动地图位置发生变化触发的事件
  regionchange: function(e){
    var that = this;
    //获取移动后的位置
    var etype = e.type;
    if(etype == 'end'){
      this.mapCtx.getCenterLocation({
        success: function(res){
          var log = res.longitude;
          var lat = res.latitude;
          findBikes(log, lat,that);
        }
      })
    }
  },

  //页面初次渲染完成后
  onReady: function(){
    //创建Map上下文
    this.mapCtx = wx.createMapContext('myMap');
  },

})

function findBikes(longitude,latitude,that){
  wx.request({
    url: 'http://localhost:8080/bike/findNear',
    method: 'GET',
    data: {   
      longitude: longitude,
      latitude: latitude,
    },
    success: function(res){
      //获取单车信息
      var bikes = res.data.map((geoResult) =>{
        return{
          longitude: geoResult.content.location[0],
          latitude: geoResult.content.location[1],
          id: geoResult.content.id,
          iconPath: '/images/bike.png',
          width: 35,
          height: 40,
        }
      })
      //传到页面
      that.setData({
        markers: bikes
      })

    }
  })
}
