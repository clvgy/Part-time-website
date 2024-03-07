import request from '@/utils/request'

const BASE_URL = '/admin/system/sysLoginLog'
export default {
    // 获取列表
    getPageList(page, limit, searchObj) {
        return request({
            url: `${BASE_URL}/${page}/${limit}`,
            method: 'get',
            params: searchObj,
        })
    },
    // 根据id去删除角色
    deleteById(id) {
        return request({
            url: `${BASE_URL}/removeLoginLogById/${id}`,
            method: 'delete',
        })
    },

    // 批量删除
    deleteBatchIds(ids) {
        return request({
            url: `${BASE_URL}/batchLoginLogByIds`,
            method: 'delete',
            data: ids
        })
    },

}