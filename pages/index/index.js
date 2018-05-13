//index.js

var app = getApp()
var l = require('../../utils/login')
var task = require('../../utils/task')

Page({

  data: {
    taskList:[],
  },

  /**
   * 点击查看任务详情
   */
  navToTaskDetail: function (e){
    // console.log(e)
    var index = parseInt(e.currentTarget.dataset.index)
    console.log("选择了第" + index + '+1个任务')
    // console.log(this.data.taskList[index])
    wx.setStorageSync('查看任务详情', this.data.taskList[index])
    // wx.setStorageSync('任务index', index)
    wx.navigateTo({
      url: '../taskDetail/taskDetail',
    })
  },

  /**
   * 设置taskList数据
   */
  setTaskList: function (){
    var that = this

    task.getTaskList('/weapp/task_list', null,
      // doSuccess
      function (res) {
        console.log("获取的task列表项：")
        console.log(res)
        that.setData({
          taskList : res
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
    l.login()
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
    wx.showNavigationBarLoading()
    this.setTaskList()
    setTimeout( function(){
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }, 1000)
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