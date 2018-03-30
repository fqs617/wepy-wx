import { API_HOST } from '../config/global.config'
// import wepy from 'wepy'
import encrypt from '@/lib/crypto/encrypt.js'
import qs from 'qs'
let token = '6qvlkh6khz'
console.log(11)
console.log(wx.getStorageSync('userInfo'))
const CONFIG = {
  isAutoMsg: true,
  // 自动loading
  isLoading: true,
  isUserId: true,
  // 是否需要认证Id
  isAuthorityId: true
}
// if(wx.getStorageSync('uid')) {
//     // 获取当前页面
//     let currentInstance = getPageInstance()
//     _onLoad.call(currentInstance, options)
//
// } else {
//     //跳转到登录页
//     wx.redirectTo({
//         url: "/pages/login/login"
//     });
// }
export function get(url, params = {}, config = {}) {
  return new Promise((resolve, reject) => {
    // params.uid = 13
    let opts = {...CONFIG, ...config}
    let userId = ''
    let userInfo = wx.getStorageSync('userInfo')
    userId = userInfo.uid
    if (opts.isUserId && !userId) {
      wx.showToast({ title: '请重新登录', icon: 'none', duration: 3000 })
      wx.redirectTo({ url: '/pages/login/login' })
      return
    }
    if (opts.isLoading) {
      wx.showLoading({ title: '数据加载中' })
    }
    if (userId) {
      params.uid = userId
    }
    let pToken = token
    let param = encrypt.sign(params, pToken)
    wx.request({
      url: API_HOST + url,
      data: param,
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function(res) {
        if (res.data.code === '0') {
          resolve(res.data.data)
        } else {
          if (opts.isAutoMsg) {
            wx.showToast({ title: res.data.message, icon: 'none', duration: 3000 })
          } else {
            resolve(res.data)
          }
        }
      },
      fail: function(res) {
        wx.showToast({ title: '请求失败', icon: 'none', duration: 3000 })
        reject(res)
      },
      complete: function() {
         wx.hideLoading()
      }
    })
  })
}
export function post(url, params = {}, config = {}) {
  return new Promise((resolve, reject) => {
    let opts = {...CONFIG, ...config}
    let userId = ''
    let userInfo = wx.getStorageSync('userInfo')
    userId = userInfo.uid
    if (opts.isUserId && !userId) {
      wx.showToast({ title: '请重新登录', icon: 'none', duration: 3000 })
      wx.redirectTo({ url: '/pages/login/login' })
      return
    }
    if (opts.isLoading) {
      wx.showLoading({ title: '数据加载中' })
    }
    if (userId) {
      params.uid = userId
    }
    let pToken = token
    let param = encrypt.sign(params, pToken)
    wx.request({
      url: API_HOST + url,
      data: qs.stringify(param),
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
        if (res.data.code === '0') {
          resolve(res.data.data)
        } else {
          if (opts.isAutoMsg) {
            wx.showToast({ title: res.data.message, icon: 'none', duration: 3000 })
          } else {
            resolve(res.data)
          }
        }
      },
      fail: function(res) {
        wx.showToast({ title: '请求失败', icon: 'none', duration: 3000 })
        reject(res)
      },
      complete: function() {
        wx.hideLoading()
      }
    })
  })
}
