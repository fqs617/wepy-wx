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
  upload(params) {
    return get('buyer/goods/list', params)
  }
}
