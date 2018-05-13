var app = getApp()
var time = require('util')

/**
 * 获取index页的任务列表
 */
function getTaskList(address, data, doSuccess, doFail) {
  
  wx.request({
    url: app.globalData.request_url + address,
    method: 'GET',
    data:{
      id: data
    },
    success: function (res) {
      var r = res.data.data[0]
      // console.log(r)
      for (var index in r) {
        r[index].pkg_datetime = time.timestampToTime(new Date(r[index].pkg_datetime).getTime())
      }
      doSuccess(r)
    },
    fail: function(){
      doFail()
    }
  })
}

/**
 * 获取taskDetail页的任务详情
 */
function getTaskDetail(taskId, doSuccess) {

  wx.request({
    url: app.globalData.request_url + '/weapp/task_detail',
    data: {
      taskId: taskId
    },
    method: 'GET',
    success: function (res) {
      var r = res.data.data[0][0]
      r.pkg_datetime = time.timestampToTime(new Date(r.pkg_datetime).getTime())
      console.log(r)
      
      doSuccess(r)
    },
    fail: function (res) {},
  })

}

module.exports = {
  getTaskList: getTaskList,
  getTaskDetail: getTaskDetail,
}