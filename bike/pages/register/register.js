// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countryCodes: ["86", "80", "84", "87"],
    countryCodeIndex: 0,
    phoneNum: ""
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

  bindCountryCodeChange: function (e) {
    //console.log('picker country code 发生选择改变，携带值为', e.detail.value);
    this.setData({
      countryCodeIndex: e.detail.value
    })
  },

  inputPhoneNum: function (e) {
    console.log(e)
    this.setData({
      phoneNum: e.detail.value
    })
  },

  genVerifyCode: function () {
    //获取国家代码索引
    var index = this.data.countryCodeIndex;
    //根据国家代码索引取值
    var countryCode = this.data.countryCodes[index];
    //获取手机号码
    var phoneNum = this.data.phoneNum;
    

    //向后台发送请求
    wx.request({
      // 小程序访问的网络请求协议必须是https，url里面不能有端口号
      url: "http://localhost:8080/user/genCode",
      //传递参数
      data: {
        'countryCode': countryCode,
        'phoneNum': phoneNum
      },
      method: 'GET',
      success: function (res) {
        
        wx.showToast({
          title: '验证码已发送',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },

  formSubmit: function (e) {
    //获取手机号和验证码
    var phoneNum = e.detail.value.phoneNum
    var verifyCode = e.detail.value.verifyCode

    // 发送手机号和验证码进行校验
    wx.request({
      url: "http://localhost:8080/user/verify",
      // 修改请求头类型 使后台能接收对应的String
       header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        phoneNum: phoneNum,
        verifyCode: verifyCode
      },
      method: "POST",
      success: function (res) {
        // 如果校验成功，那么就将手机信息保存到mongo中
        if (res.data) {
          wx.request({
            // 微信小程序成产环境请求的协议必须是https，地址必须是域名，不能带端口号
            url: "http://localhost:8080/user/register",
            // header: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'POST',
            data: {
              phoneNum: phoneNum,
              regDate: new Date(),
              status: 1
            },


            success: function(res) {
              if (res.data) {
                //成功保存用户注册信息  
                // 跳转到充值页面
                wx.navigateTo({
                  url: '../deposit/deposit',
                })

                
                //更新getApp().globalData中的数据，是更新内存中的数据

                  //成功注册修改用户的状态，0 未注册，1 已绑定手机号，2 已实名认证
                  getApp().globalData.status = 1;
                  //保存用户手机号
                  getApp().globalData.phoneNum = phoneNum;

                //将用户数据保存到手机存储卡
                wx.setStorageSync("status", 1)
                wx.setStorageSync("phoneNum", phoneNum)

              } else {
                wx.showModal({
                  title: '提示',
                  content: '服务端错误，请稍后再试',
                })
              }
            }
            
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '验证码有误，请重新输入！',
            showCancel: false
          })
        }
      }
    })
  }
})
