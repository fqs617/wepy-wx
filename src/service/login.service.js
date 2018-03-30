import { get, post } from './http.base'
export default class loginService {
  /**
   * 登录
   * @param {name} 云彩用户名 可以是 手机 邮箱 用户名
   * @param {password} 云彩密码
   * @param {openId} 微信openId
   * @param {uid} 买家ID false 表示不需要uid
   * @returns
   * @memberof UserService
   */
  doLogin(params) {
    return post('buyer/login', params, {isUserId: false, isLoading: false})
  }
/**
   * 买家忘记密码发送验证码接口
   * @param {uid} 买家ID [必须]
   * @param {salt} 签名 [必须]
   * @param {any} params.type 需要验证的类型 1:手机号 2邮箱号 [必须]
   * @param {any} params.phone 手机号 [非必须]
   * @param {any} params.email 邮箱 [非必须]
   * @returns
   * @memberof UserService
   */
  sendCode(params) {
    return post('buyer/password/forget/sendCode', params)
  }
  /**
   * 退出登录
   * @param {uid} 买家ID false 表示不需要uid
   * @returns
   * @memberof UserService
   */
  loginOut(params) {
    return get('user/logout', params)
  }
}
