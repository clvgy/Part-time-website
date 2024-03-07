import request from '@/utils/request'
const BASE_URL = '/admin/system/sysMenu'
export default {
    // 所有菜单列表
    findNodes() {
        return request({
            url: `${BASE_URL}/findNodes`,
            method: 'get',
        })
    },
    // 保存菜单
    save(menu) {
        return request({
            url: `${BASE_URL}/addMenu`,
            method: 'post',
            data: menu
        })

    },

    // 根据id删除
    removeById(id) {
        return request({
            url: `${BASE_URL}/removeMenu/${id}`,
            method: 'delete',
        })
    },
    // 修改
    updateById(menu) {
        return request({
            url: `${BASE_URL}/updateMenu`,
            method: 'post',
            data: menu
        })
    },

    /*
查看某个角色的权限列表
*/
    toAssign(roleId) {
        return request({
            url: `${BASE_URL}/toAssign/${roleId}`,
            method: 'get'
        })
    },

    /*
    给某个角色授权
    */
    doAssign(assginMenuVo) {
        return request({
            url: `${BASE_URL}/doAssign`,
            method: "post",
            data: assginMenuVo
        })
    },
    // 更新菜单状态
    updateStatusById(id,status){
        return request({
            url:`${BASE_URL}/updateStatus/${id}/${status}`,
            method:'post',
        })
    }
}