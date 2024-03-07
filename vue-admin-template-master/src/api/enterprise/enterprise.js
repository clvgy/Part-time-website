import request from '@/utils/request'

// 定义公共的api 
const BASE_URL = '/admin/system/sysEnterprise';

export default {

    findAll() {
        return request({
            url: `${BASE_URL}/findAll`,
            method: 'get',
        })
    },
    // 查询用户和分页
    getEnterprisePageInfo(page, limit, searchObj) {
        return request({
            url: `${BASE_URL}/${page}/${limit}`,
            method: 'get',
            params: searchObj
        })
    },

    // 更改用户状态
    changeStatus(id, status) {
        // /updateStatus/{id}/{status}
        return request({
            url: `${BASE_URL}/updateStatus/${id}/${status}`,
            method: 'get',
        })
    },

    // 添加用户
    saveEnterprise(enterprise) {
        return request({
            url: `${BASE_URL}/addEnterprise`,
            method: 'post',
            data: enterprise
        })
    },

    // 修改用户
    updateEnterprise(enterprise) {
        return request({
            url: `${BASE_URL}/updateEnterprise`,
            method: 'post',
            data: enterprise
        })
    },

    // 根据id去删除
    deleteEnterpriseById(id) {
        return request({
            url: `${BASE_URL}/removeEnterpriseById/${id}`,
            method: 'delete',
        })
    },

    //    批量删除
    deleteBatchEnterpriseByIds(ids) {
        return request({
            url: `${BASE_URL}/batchEnterpriseByIds`,
            method: 'delete',
            data: ids
        })
    }
}