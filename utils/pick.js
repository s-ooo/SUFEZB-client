
// var task = require('../task.js')
var app = getApp()

function showPop (order) {

  if (app.globalData.authStatus == 1) {
    console.log(order)
    wx.showModal({
      title: '提示',
      content: '确认领取该任务',
      success: function (res) {
        if (res.confirm) {

          wx.request({
            url: app.globalData.request_url + '/weapp/task_pick',
            data: order,
            method: 'GET',
            success: function (res) {
              console.log(res)

              wx.showToast({
                title: '已领取',
                icon: "success",
                duration: 2000
              })

            },
            fail: function (res) { },
            complete: function (res) { },
          })

          
        }
      }
    })
  }

  else {
    wx.showModal({
      title: '提示',
      content: '请先完成校园认证',
      showCancel: false,
    })
  }
  
};

module.exports = {
  showPop : showPop
}