import request from '@/utils/request'
const BASE_URL = '/admin/system/sysSttle'
export default {

    findAll() {
        return request({
            url: `${BASE_URL}/findAll`,
            method: 'get',
        })
    },
    // 获取列表
    getPageList(page, limit, searchObj) {
        return request({
            url: `${BASE_URL}/${page}/${limit}`,
            method: 'get',
            params: searchObj,
        })
    },

    // 添加
    addBySttle(sttle) {
        return request({
            url: `${BASE_URL}/addSttle`,
            method: 'post',
            data: sttle
        })
    },


    // 修改
    updateBySttle(sttle) {
        return request({
            url: `${BASE_URL}/updateSttle`,
            method: 'post',
            data: sttle
        })
    },


    // 根据id去删除角色
    deleteSttleById(id) {
        return request({
            url: `${BASE_URL}/removeSttleById/${id}`,
            method: 'delete',
        })
    },

    //    批量删除
    deleteBatchSttleByIds(ids) {
        return request({
            url: `${BASE_URL}/batchSttleByIds`,
            method: 'delete',
            data: ids
        })
    },



}