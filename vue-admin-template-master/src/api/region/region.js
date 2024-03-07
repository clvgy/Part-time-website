import request from '@/utils/request'
const BASE_URL = '/admin/system/sysRegion'
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
    addByRegion(region) {
        return request({
            url: `${BASE_URL}/addRegion`,
            method: 'post',
            data: region
        })
    },


    // 修改
    updateByRegion(region) {
        return request({
            url: `${BASE_URL}/updateRegion`,
            method: 'post',
            data: region
        })
    },


    // 根据id去删除角色
    deleteRegionById(id) {
        return request({
            url: `${BASE_URL}/removeRegion/${id}`,
            method: 'delete',
        })
    },

    //    批量删除
    deleteBatchRegionByIds(ids) {
        return request({
            url: `${BASE_URL}/removeRegionByIds`,
            method: 'delete',
            data: ids
        })
    },



}