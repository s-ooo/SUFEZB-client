var app = getApp()
var l = require('../../../utils/login')
var setting = require('../../../utils/setting')

Page({

  data: {
    userInfo: {},
    authStatusLabel:'',
    labelTextColor:'',    
  },

  bindCampusInfo: function(){

    wx.navigateTo({
      url: '../stuAuth/stuAuth',
    })
  },

  setting: function() {
    setting.setting()

  },

  myPublish: function () {
    wx.navigateTo({
      url: '../myPublish/myPublish',
    })
  },

  myPick:function() {
    wx.navigateTo({
      url: '../myPick/myPick',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
    })
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
    var that = this

    setTimeout(function() {
      that.setData({
        userInfo: app.globalData.userInfo,
      })
    },3000)

    wx.request({
      url: app.globalData.request_url + '/weapp/stu_info',
      data: {
        id: app.globalData.userId,
      },
      method: 'GET',
      success: function(res) {
        // console.log("stu_info接口的返回结果：")
        // console.log(res)
        
        if (res.data.data[0][0] != null){
          // console.log(res.data.data[0][0])
          // console.log(res.data.data[0][0].auth_status)

          switch (res.data.data[0][0].auth_status) {
            case 0:
              that.setData({
                authStatusLabel: '审核中',
                labelTextColor: '#576b95',
              })
              break;
            case 1:
              that.setData({
                authStatusLabel: '已认证',
                labelTextColor: '#09bb07',
              })
              break;
            case 2:
              that.setData({
                authStatusLabel: '审核未通过',
                labelTextColor: '#e64340',
              })
              break;
          }
        }
        else{
          that.setData({
            authStatusLabel: '未认证'
          })
        }    

      },
      fail: function(res) {},
    })
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
  
  }
})