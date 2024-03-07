import request from '@/utils/request'
const BASE_URL = '/admin/system/sysPosType'
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

    // 添加角色
    addByPosType(posType) {
        return request({
            url: `${BASE_URL}/addPosType`,
            method: 'post',
            data: posType
        })
    },


    // 修改
    updateByPosType(posType) {
        return request({
            url: `${BASE_URL}/updatePosType`,
            method: 'post',
            data: posType
        })
    },


    // 根据id去删除角色
    deletePosTypeById(id) {
        return request({
            url: `${BASE_URL}/removePosTypeById/${id}`,
            method: 'delete',
        })
    },

    //    批量删除
    deleteBatchPosTypeByIds(ids) {
        return request({
            url: `${BASE_URL}/batchPosTypeByIds`,
            method: 'delete',
            data: ids
        })
    },



}