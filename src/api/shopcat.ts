import { requset } from "../https/baseInfo";

// 获取购物车详情
export function getShop(params?: any) {
    return requset({
        method: 'get',
        url: <string>'/getdata/shop',
        params
    })
}
// 删除商品

export function deletShop(data: any) {
    return requset({
        method: 'delete',
        url: <string>'/Shoppingcart/deteleshop',
        data
    })
}