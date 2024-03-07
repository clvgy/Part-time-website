import request from '@/utils/request'
const BASE_URL = '/admin/system/sysResume'
export default {
    findAll() {
        return request({
            url: `${BASE_URL}/findAll`,
            method: 'get',
        })
    },
    //根据id查询
    findByid(id) {
        return request({
            url: `${BASE_URL}/queryById/${id}`,
            method: 'get'
        })
    },

}