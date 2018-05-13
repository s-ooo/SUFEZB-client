// pages/my/myPublish/myPublish.js

var app = getApp()
var task = require('../../../utils/task')

Page({

  data: {
    taskList: [],
  },

  navToTaskDetail: function(e){
    var index = parseInt(e.currentTarget.dataset.index);
    console.log("选择了第" + index + '个任务');
    // console.log(e)
    console.log(this.data.taskList[index])
    wx.setStorageSync('查看任务详情', this.data.taskList[index]);
    wx.navigateTo({
      url: '../../taskDetail/taskDetail',
    })

  },

  /**
   * 设置taskList数据
   */
  setTaskList: function () {
    var that = this

    task.getTaskList('/weapp/task_publish_list', app.globalData.userId,
      // doSuccess
      function (res) {
        console.log("获取的task列表项：")
        console.log(res)
        that.setData({
          taskList: res
        })
      },
      // doFail
      function (res) {
        console.log(res)
      }
    )
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setTaskList()
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
  
  }
})