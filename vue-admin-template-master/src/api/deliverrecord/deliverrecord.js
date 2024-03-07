import request from '@/utils/request'
const BASE_URL = '/admin/system/sysDeliverRecord'
export default {
   
    // 获取列表
    getPageList(page, limit, searchObj) {
        return request({
            url: `${BASE_URL}/${page}/${limit}`,
            method: 'get',
            params: searchObj,
        })
    },

}