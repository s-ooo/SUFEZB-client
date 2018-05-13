// pages/my/campusInfo/campusInfo.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    srcStudentIdCard:'',
    srcCampusCard: '',
    disabled:false
  },

  chooseStudentIDCard: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original'], //original原图，compressed压缩图
      sourceType: ['album', 'camera'], //来源，album相册，camera相机 
      success: function (res) {
        that.setData({
          srcStudentIdCard : res.tempFilePaths
        })

        var filePath = res.tempFilePaths[0]
        console.log(filePath)

        wx.uploadFile({
          url: 'https://499436009.wq5000.xyz/weapp/upload_file',
          filePath: filePath,
          name: 'aaa',

          success: function (res) {
            console.log(res)
            res = JSON.parse(res.data)
            console.log(res)
          },

          fail: function (e) {
            util.showModel('上传图片失败')
          }
        })

      }
    })
  },

  chooseCampusCard: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original'], //original原图，compressed压缩图
      sourceType: ['album', 'camera'], //来源，album相册，camera相机 
      success: function (res) {

        // 【TODO】上传图片

        that.setData({
          srcCampusCard: res.tempFilePaths
        })
      }
    })
  },

  validateForm: function (obj) {
    var FLAG = ''

    // console.log("dd")
    // console.log(obj)

    for (var p in obj) {
      // console.log(obj[p])
      // console.log(obj[p].length)


      if (obj[p].length == 0 & p != 'taskNote') {
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

  formSubmit: function (e) {

    var that = this;
    var v = e.detail.value
    v.userId = app.globalData.userId

    wx.showModal({
      title: '提示',
      content: '确认提交',
      success: function (res) {

        console.log(res.confirm)
        if (res.confirm) {

          if (that.validateForm(v) == 0) {

            console.log("可以提交")
            console.log(v)

            // 【TODO】GET请求修改为POST，数据库INSERT
            wx.request({
              url: app.globalData.request_url + '/weapp/submit_stu_info',
              data: v,
              method: 'GET',
              success: function (res) {
                console.log(res)

                if (res.data.code == 0) {
                  wx.showToast({
                    title: '提交成功',
                    icon: "success",
                    duration: 2000
                  })

                  that.setData({
                    disabled: true
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
        };
     
      }
    })
  
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
  
  }
})