import request from '@/utils/request'

// 定义公共的api 
const BASE_URL = '/admin/system/sysAddress';

export default{
    // 查询用户和分页
    getAddressPageInfo(page,limit,searchObj){
        return request({
            url:`${BASE_URL}/${page}/${limit}`,
            method:'get',
            params:searchObj
        })
    },


    // 添加
    saveAddress(address){
        return request({
            url:`${BASE_URL}/addAddress`,
            method:'post',
            data:address
        })
    },

    // 修改用户
    updateAddress (address) {
        return request({
            url:`${BASE_URL}/updateAddress`,
            method:'post',
            data:address
        })
    },

    // 根据id去删除
    deleteAddressById(id) {
        return request({
            url: `${BASE_URL}/removeAddressById/${id}`,
            method: 'delete',
        })
    },

    //    批量删除
    deleteBatchAddressByIds(ids) {
        return request({
            url: `${BASE_URL}/batchAddressByIds`,
            method: 'delete',
            data: ids
        })
    }
}