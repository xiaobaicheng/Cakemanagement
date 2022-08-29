// import Cookies from "js-cookie";

const TokenKey: string = "token";

//获取token
export function getToken() {
  return localStorage.getItem(TokenKey);
}

//设置token,写入浏览器
export function setToken(token: any) {
  return localStorage.setItem(TokenKey, token);
}

//删除token
export function removeToken() {
  return localStorage.removeItem(TokenKey)
}
