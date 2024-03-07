import request from '@/utils/request'

// 定义公共的api 
const BASE_URL = '/admin/system/sysUser';

export default{

    getAllStudentrPageInfoByUser(page,limit,searchObj){
        return request({
            url:`${BASE_URL}/student/${page}/${limit}`,
            method:'get',
            params:searchObj
        })
    },

    // 查询用户和分页
    findAllSchoolUser(){
        return request({
            url:`${BASE_URL}/findAllSchool`,
            method:'get',
        })
    },

    // 查询用户和分页
    findAllEnterpriseUser(){
        return request({
            url:`${BASE_URL}/findAllEnterprise`,
            method:'get',
        })
    },

    // 查询用户和分页
    findAllUser(){
        return request({
            url:`${BASE_URL}/findAll`,
            method:'get',
        })
    },

    // 查询用户和分页
    getUserPageInfo(page,limit,searchObj){
        return request({
            url:`${BASE_URL}/${page}/${limit}`,
            method:'get',
            params:searchObj
        })
    },

    // 更改用户状态
    changeStatus(id,status){
        // /updateStatus/{id}/{status}
        return request({
            url:`${BASE_URL}/updateStatus/${id}/${status}`,
            method:'get',
        })
    },

    // 添加用户
    saveUser(user){
        return request({
            url:`${BASE_URL}/addUser`,
            method:'post',
            data:user
        })
    },

    // 修改用户
    updateUser (user) {
        return request({
            url:`${BASE_URL}/updateUser`,
            method:'post',
            data:user
        })
    },

    // 根据id去删除
    deleteUserById(id) {
        return request({
            url: `${BASE_URL}/removeUserById/${id}`,
            method: 'delete',
        })
    },

    //    批量删除
    deleteBatchUserByIds(ids) {
        return request({
            url: `${BASE_URL}/batchUserByIds`,
            method: 'delete',
            data: ids
        })
    }
}