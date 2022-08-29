import { requset } from "../https/baseInfo";

// 获取所有商品详情
export function getShop(params?: any) {
    return requset({
        method: 'get',
        url: <string>'/getdata/details',
        params
    })
}
// 删除商品

export function deletShop(data: any) {
    return requset({
        method: 'delete',
        url: <string>'/updatasetails/detele',
        data
    })
}

// 新增商品
export function AddShop(data: any) {
    return requset({
        method: 'post',
        url: <string>'/updatasetails',
        data
    })
}

// 编辑商品信息
export function eamitShop(data: any) {
    return requset({
        method: 'post',
        url: <string>'/updatasetails/updata',
        data
    })
}
