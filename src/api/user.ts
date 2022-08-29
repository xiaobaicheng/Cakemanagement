import {requset} from "../https/baseInfo";

// 登陆
export function Login(data: any) {
    return requset({
        method: 'post',
        url: <string>'/login',
        data
    })
}