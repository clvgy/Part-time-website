import request from '@/utils/request'
const BASE_URL = '/admin/system/sysRole'
export default {
    // 获取列表
    getPageList(page, limit, searchObj) {
        return request({
            url: `${BASE_URL}/${page}/${limit}`,
            method: 'get',
            params: searchObj,
        })
    },

    // 添加角色
    addByRole(role) {
        return request({
            url: `${BASE_URL}/addRole`,
            method: 'post',
            data: role
        })
    },

    // 根据id去查角色
    getRoleById() {

        return request({
            url: `${BASE_URL}/getRoleById/${id}`,
            method: 'get',
        })


    },


    // 修改
    updateByRole(role) {
        return request({
            url: `${BASE_URL}/updateRole`,
            method: 'post',
            data: role
        })
    },


    // 根据id去删除角色
    deleteRoleById(id) {
        return request({
            url: `${BASE_URL}/removeRoleById/${id}`,
            method: 'delete',
        })
    },

    //    批量删除
    deleteBatchRoleByIds(ids) {
        return request({
            url: `${BASE_URL}/batchRoleByIds`,
            method: 'delete',
            data: ids
        })
    },

    //根据用户id查询用户已分配的角色
    getRolesByUserId(userId) {
        return request({
            url: `${BASE_URL}/toAssign/${userId}`,
            method: 'get'
        })
    },

    //分配角色
    assignRoles(assginRoleVo) {
        return request({
            url: `${BASE_URL}/doAssign`,
            method: 'post',
            data: assginRoleVo
        })
    }


}