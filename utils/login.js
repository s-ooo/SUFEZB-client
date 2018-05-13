// login.js

function login() {
  var app = getApp()
  var that = this
   
  // wx.login()获取临时登录凭证code
  wx.login({
    success: function (e) {
      console.log("临时登录凭证code（有效期五分钟）:")
      console.log(e.code)

      // wx.getUserInfo()获取用户信息
      wx.getUserInfo({
        success: function (res) {
          app.globalData.userInfo = res.userInfo
          // console.log("用户信息userInfo:")
          // console.log(app.globalData.userInfo)

          // 服务器后台调用api，使用code换取openid和session_key
          wx.request({
            url: app.globalData.request_url +'/weapp/user_login',
            data: {
              code: e.code,
            },
            method: 'GET',
            success: function (res) {
              console.log("user_login接口返回结果：")
              console.log(res)
              if (JSON.stringify(res.data.data.token) != "{}") {
                console.log("user_login接口返回结果的token：")
                console.log(res.data.data.token)
                console.log("提示：登录成功，保存token到本地")
                wx.setStorageSync('token', res.data.data.token)

                that.addUser(res.data.data.token, app.globalData.userInfo)

              }
              else {
                console.log("提示：获取token失败")
              }
            }
          })
        },
        fail: function (res) {
          app.globalData.getUserInfoFail = true
        },
      })
    }
  })
}

function addUser(token, userInfo) {
  var app = getApp()
  var that = this

  var user = {}
  user.openId = token.openid
  user.sessionKey = token.session_key
  user.nickName = userInfo.nickName
  user.avatarUrl = userInfo.avatarUrl

  console.log("需要新增的用户：")
  console.log(user)

  wx.request({
    url: app.globalData.request_url + '/weapp/user_add',
    data: user,
    method: 'GET',
    success: function (res) {
      // console.log("user_add接口返回结果：")
      // console.log(res)
      if (JSON.stringify(res.data.data.res2[0][0]) != "{}") {
        app.globalData.userId = res.data.data.res2[0][0].id
        app.globalData.authStatus = res.data.data.res2[0][0].stu_auth_status
      }
    },
  })
}

module.exports = {
  login: login,
  addUser: addUser,
}