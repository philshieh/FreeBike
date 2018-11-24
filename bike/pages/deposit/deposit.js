// pages/deposit/deposit.js

var myUtil = require("../../utils/myUtil.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  deposit: function(){
    
    var that = this;
    //获取用户手机号
    var phoneNum = myUtil.get("phoneNum");

    //提示框
    wx.showModal({
      title: '提示',
      content: '是否要充值押金',
      confirmText: '确认',
      success: function(res){
        if(res.confirm){
          //模拟加载动画
          wx.showLoading({
            title: '充值中......',
            //mask true禁用其他按钮 避免重复提交
            mask: true,
          })
          wx.request({
            url: 'http://localhost:8080/user/deposit',
            method: 'POST',
            data: {
              phoneNum: phoneNum,
              deposit: 299,
              status: 2,
            },
            success: function(res){
              if(res.data){
                //修改用户状态至已充值
                getApp().globalData.status = 2;
                wx.setStorageSync("status", 2)
                //隐藏加载动画
                wx.hideLoading();
                wx.navigateTo({
                  url: '../identify/identify',
                })
              }else{
                wx.showModal({
                  title: '提示',
                  content: '充值失败，请稍后再试！',
                })
              }
            }
          })  
        }else{}
      }
    })
  }

})