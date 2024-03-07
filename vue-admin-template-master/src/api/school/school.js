import request from '@/utils/request'

// 定义公共的api 
const BASE_URL = '/admin/system/sysSchool';

export default{
    // 查询用户和分页
    getSchoolPageInfo(page,limit,searchObj){
        return request({
            url:`${BASE_URL}/${page}/${limit}`,
            method:'get',
            params:searchObj
        })
    },


    // 添加
    saveSchool(school){
        return request({
            url:`${BASE_URL}/addSchool`,
            method:'post',
            data:school
        })
    },

    // 修改用户
    updateSchool (school) {
        return request({
            url:`${BASE_URL}/updateSchool`,
            method:'post',
            data:school
        })
    },

    // 根据id去删除
    deleteSchoolById(id) {
        return request({
            url: `${BASE_URL}/removeSchoolById/${id}`,
            method: 'delete',
        })
    },

    //    批量删除
    deleteBatchSchoolByIds(ids) {
        return request({
            url: `${BASE_URL}/batchSchoolByIds`,
            method: 'delete',
            data: ids
        })
    }
}