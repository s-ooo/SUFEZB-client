

var app = getApp()
var task = require('../../utils/task.js')

Page({

  data: {
    userId: '',
    taskId: '',
    taskDetail: {},
    order: {},
    courier: {},
  },

  pickTask: function () {

    var that = this

    var order = {};
    order.taskId = this.data.taskDetail.task_id
    order.authorId = this.data.taskDetail.author_id
    order.courierId = app.globalData.userId

    if (app.globalData.authStatus == 1) {
      console.log(order)
      wx.showModal({
        title: '提示',
        content: '确认领取该任务',
        success: function (res) {
          if (res.confirm) {

            wx.request({
              url: app.globalData.request_url + '/weapp/task_pick',
              data: {
                taskId: that.data.taskDetail.task_id,
                authorId: that.data.taskDetail.author_id,
                courierId: app.globalData.userId,
              },
              method: 'GET',
              success: function (res) {
                console.log(res)

                wx.showToast({
                  title: '已领取',
                  icon: "success",
                  duration: 2000
                })

                task.getTaskDetail(
                  that.data.taskId,
                  function (res) {
                    console.log("taskDetail")
                    console.log(res);
                    that.setData({
                      taskDetail: res
                    });
                  }
                )

                that.getOrder(that.data.taskId)

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
        confirmText: '前往认证',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../my/stuAuth/stuAuth',
            })
          } 
        }

      })
    }
  },

  completeTask: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认已完成该任务',
      success: function (res) {
        if (res.confirm) {

          wx.request({
            url: app.globalData.request_url + '/weapp/task_complete',
            data: {
              taskId: that.data.taskDetail.task_id
            },
            method: 'GET',
            success: function(res) {
              console.log(res)

              that.getOrder(that.data.taskDetail.task_id)

            },
            fail: function(res) {},
            complete: function(res) {},
          })
          
          wx.showToast({
            title: '已完成，等待确认',
            icon: "success",
            duration: 2000
          });
          
        }
      }
    })
  },
 
  deleteTask:function () {
    var that = this;
    var pages = getCurrentPages();
    wx.showModal({
      title: '提示',
      content: '确认删除任务',
      success: function (res) {
        if (res.confirm) {

          wx.request({
            url: app.globalData.request_url + '/weapp/delete_task',
            data: {
              taskId: that.data.taskDetail.task_id
            },
            method: 'GET',
            success: function(res) {
              console.log(res)
              wx.showToast({
                title: '已删除',
                icon: "success",
                duration: 2000
              });

              setTimeout(function(){
                wx.navigateBack({
                  delta: 1
                })
              }, 2500)
             
            },
            fail: function(res) {},
          })
          
        }
      }
    })
  },

  getOrder: function (taskId) {
    var that = this

    wx.request({
      url: app.globalData.request_url + '/weapp/order',
      data: {
        taskId: taskId
      },
      method: 'GET',
      success: function(res) {
        console.log("查询taskId为" + taskId + "的order：")
        if (res.data.data[0][0] != null) {
          // console.log(res.data.data[0][0])
          that.setData({
            order: res.data.data[0][0]
          })
          console.log(that.data.order)
          that.getCourier(that.data.order.courier_id)
        }
        else{
          console.log("该任务未被领取")
        }
        
      },
      fail: function(res) {},
    })
  },

  getCourier: function (courierId) {
    var that = this

    wx.request({
      url: app.globalData.request_url + '/weapp/courier',
      data: {
        userId: courierId
      },
      method: 'GET',
      success: function(res) {
        if (res.data.data[0][0] != null) {
          console.log("领取人详情：")
          console.log(res)
          that.setData({
            courier: res.data.data[0][0]
          })
        }   
      },
      fail: function(res) {},
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      taskId: wx.getStorageSync('查看任务详情').task_id,
      taskDetail: wx.getStorageSync('查看任务详情'),
      userId: app.globalData.userId,
    })
    if (this.data.taskDetail.task_note == '') {
      this.data.taskDetail.task_note = '无'
    }
    this.setData({
      taskDetail: this.data.taskDetail,
    })
    this.getOrder(this.data.taskId)  
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