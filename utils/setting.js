var app = getApp()
var l = require('/login.js')

function setting() {
  var that = this
  if (wx.openSetting) {
    wx.openSetting({
      success: function (res) {
        //尝试再次登录
        l.login()
      }
    })
  } else {
    wx.showModal({
      title: '授权提示',
      content: '小程序需要您的微信授权才能使用哦~ 错过授权页面的处理方法：删除小程序->重新搜索进入->点击授权按钮'
    })
  }
}

module.exports = {
  setting: setting,
}