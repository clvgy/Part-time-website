import request from '@/utils/request'
const BASE_URL = '/admin/system/sysPosition'
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
    addByPosition(position) {
        return request({
            url: `${BASE_URL}/addPosition`,
            method: 'post',
            data: position
        })
    },


    // 修改
    updateByPosition(position) {
        return request({
            url: `${BASE_URL}/updatePosition`,
            method: 'post',
            data: position
        })
    },


    // 根据id去删除角色
    deletePositionById(id) {
        return request({
            url: `${BASE_URL}/removePosition/${id}`,
            method: 'delete',
        })
    },

    //    批量删除
    deleteBatchPositionByIds(ids) {
        return request({
            url: `${BASE_URL}/removePositionByIds`,
            method: 'delete',
            data: ids
        })
    },



}