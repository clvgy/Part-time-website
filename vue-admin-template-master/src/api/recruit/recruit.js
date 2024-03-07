import request from '@/utils/request'
const BASE_URL = '/admin/system/sysRecruit'
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
    addByRecruit(recruit) {
        return request({
            url: `${BASE_URL}/addRecruit`,
            method: 'post',
            data: recruit
        })
    },


    // 修改
    updateByRecruit(recruit) {
        return request({
            url: `${BASE_URL}/updateRecruit`,
            method: 'post',
            data: recruit
        })
    },


    // 根据id去删除角色
    deleteRecruitById(id) {
        return request({
            url: `${BASE_URL}/removeUserById/${id}`,
            method: 'delete',
        })
    },

    //    批量删除
    deleteBatchRecruitByIds(ids) {
        return request({
            url: `${BASE_URL}/batchUserByIds`,
            method: 'delete',
            data: ids
        })
    },



}