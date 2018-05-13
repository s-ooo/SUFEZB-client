
var util = require('../../utils/util.js')
var setting = require('../../utils/setting.js')
var app = getApp()

Page({

  data: {
    formInit:'',
    index: 0,
    startPlaceArray: ['快递中心', '武川路', '其他'],
    multiIndex: [0, 0],
    multiArray: [['宿舍楼', '教学楼', '食堂', '学院楼',  '其他'], ['1号楼', '2号楼', '3号楼', '4号楼', '5号楼', '6号楼', '7号楼', '8号楼', '9号楼', '10号楼', '11号楼', '12号楼', '13号楼', '14号楼', '15号楼', '16号楼', '17号楼', '18号楼', '19号楼']],

    date: '',
    time: '',
  },

// 领取地点picker
  bindPickerChange: function (e) {
    var that = this
    console.log('选择了领取地点', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

// 送达地点picker
  bindMultiPickerChange: function (e) {
    console.log('选择了送达地点', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },

  bindMultiPickerColumnChange: function (e) {
    console.log('滑动列号：', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (data.multiIndex[0]) {
      case 0:
        data.multiArray[1] = ['1号楼', '2号楼', '3号楼', '4号楼', '5号楼', '6号楼', '7号楼', '8号楼', '9号楼', '10号楼', '11号楼', '12号楼', '13号楼', '14号楼', '15号楼', '16号楼', '17号楼', '18号楼', '19号楼'];
        break;
      case 1:
        data.multiArray[1] = ['第一教学楼', '第二教学楼', '第三教学楼', '第四教学楼'];
        break;
      case 2:
        data.multiArray[1] = ['绿叶餐厅', '清真食堂', '新园餐厅', '盛环餐厅',]
        break;
      case 3:
        data.multiArray[1] = ['信息管理与工程学院', '国际工商管理学院'];
        break;
      case 4:
      // 【TO DO】 if picker选择其他，new一个input
        data.multiArray[1] =['其他']
        break;
    }
  
    this.setData(data);
  },

// 领取时间date
  bindDateChange: function (e) {
    console.log('选择了领取时间date', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

// 领取时间time
  bindTimeChange: function (e) {
    console.log('选择了领取时间time', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },

  /**
   * 前台校验表单
   */
  validateForm: function (obj) {
    var FLAG = ''
    // console.log("dd")
    // console.log(obj)
    for (var p in obj){
      // console.log(obj[p])
      // console.log(obj[p].length)
      if (obj[p].length == 0 & p != 'taskNote' ){
        console.log(p)
        wx.showToast({
          title: '请填写' + p,
          icon: 'none',
          image: '',
          duration: 1500
        })
        FLAG = 1
        break;
      }
      FLAG = 0
    }

    return FLAG

  },

  /**
   * 校验登录态
   */
  validateLoginStatus: function () {
    var c = wx.getStorageSync('token')
    console.log(c)
    if (c == ''){
      wx.showModal({
        title: '提示',
        content: '请授权登录',
        success: function (res) {
          if (res.confirm) {
            setting.setting()
          }
        }
      })
      return 1
    }
    else{
      return 0
    }
  },

  /**
   * 提交表单
   */
  formSubmit: function (e) {
    var that = this;

    var v = e.detail.value

    v.placeStart = this.data.startPlaceArray[v.placeStart]
    v.placeArrive = this.data.multiArray[1][this.data.multiIndex[1]]

    if (v.pkgDate != null) {
      v.pkgDate = this.data.date
    }
    if (v.pkgTime != null) {
      v.pkgTime = this.data.time
    }

    var datetime = [v.pkgDate, v.pkgTime+":00",].join(" ")
    v.pkgDateTime = datetime;

    if (v.pkgDate != null){
      v.pkgDate = this.data.date
    }

    wx.showModal({
      title: '提示',
      content: '确认发布任务',
      success: function (res) {          
    
        console.log(res.confirm)        
        if (res.confirm) {

          if (that.validateForm(v) == 0) {

            if (that.validateLoginStatus() == 0){
  
              v.userId = app.globalData.userId
              console.log("可以提交")

              wx.request({
                url: app.globalData.request_url + '/weapp/submit_task',
                data: v,
                method: 'GET',
                success: function (res) {
                  console.log(res)

                  if (res.data.code == 0){
                    wx.showToast({
                      title: '发布成功',
                      icon: "success",
                      duration: 2000
                    })
                    that.setData({
                      formInit: '',
                      index: 0,
                      multiIndex: [0,0]
                    })
                  }
                  else {
                    wx.showModal({
                      title: '',
                      content: JSON.stringify(res.data),
                      showCancel: false
                    })
                  }

                },
                fail: function (err) {
                  // fail  
                  console.log("push err")
                  console.log(err);
                }
              })

            }
          }
        };      
 
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

//  调用当前时间
    var date = util.myDate(new Date());
    var time = util.myTime(new Date()); 
    this.setData({
      date: date,
      time: time
    });  
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