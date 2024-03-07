import request from '@/utils/request'
const BASE_URL = '/admin/system/sysCategory'
export default {
    // 获取列表
    getPageList(page, limit, searchObj) {
        return request({
            url: `${BASE_URL}/${page}/${limit}`,
            method: 'get',
            params: searchObj,
        })
    },
    // 添加分类
    addCategory(category) {
        return request({
            url: `${BASE_URL}/addCategory`,
            method: 'post',
            data: category
        })
    },

    // 修改
    updateCategory(category) {
        return request({
            url: `${BASE_URL}/updateCategory`,
            method: 'post',
            data: category
        })
    },

    // 根据id去删除角色
    deleteCategoryById(id) {
        return request({
            url: `${BASE_URL}/removeCategory/${id}`,
            method: 'delete',
        })
    },

    // 批量删除
    deleteBatchCategoryByIds(ids) {
        return request({
            url: `${BASE_URL}/removeCategoryByIds`,
            method: 'delete',
            data: ids
        })
    },

    //查询分类列表
    findAll(){
        return request({
            url: `${BASE_URL}/findAll`,
            method: 'get',
        })
    }
}