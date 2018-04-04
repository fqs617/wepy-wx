import { get } from './http.base'
export default class homeService {
  /**
   *
   * 获取商品分类列表
   * @param {any} params.uid 买家ID [必须]
   * @param {any} params.sellerId 卖家ID [非必须] 卖家首页时必须
   * @returns
   * @memberof GoodService
   */
  getGoodList(params) {
    return get('buyer/goods/list', params)
  }
  /**
   *
   * 获取商品详情页数据
   * @param {any} params.uid 买家ID [必须]
   * @param {any} params.sku 商品id [必须]
   * @param {any} params.client 微信：10 PC：20 APP：30（数字类型）
   * @returns
   * @memberof GoodService
   */
  getDetail(params, config = {}) {
    params.client = 10
    return get('buyer/goods/detail', params, config)
  }
  /**
   * 城市列表查询
   * @param {*}
   * @return
   */
  getCityList(params = {}) {
    return get('web/common/community/city/list', params)
  }
  /**
   * web端小区区域列表查询
   * @param {*} cityId [是] 城市ID
   * @param {*} baiduCityId [否] 百度的城市ID
   * @return
   */
  getDistrictist(params = {}) {
    return get('web/common/community/district/list', params)
  }
}
