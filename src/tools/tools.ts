// 书写一些工具类
function changeFromDate(jsonParmas: { [prop: string]: any }): FormData {
  let fromDate = new FormData();
  for (const key in jsonParmas) {
    if (Object.prototype.hasOwnProperty.call(jsonParmas, key)) {
      fromDate.append(key, jsonParmas[key]);
    }
  }
  return fromDate;
}
function setLocaStorage(key: string, values: object): void {
  localStorage.setItem(key, encodeURI(JSON.stringify(values)));
}
function getLoStorage(key: string): any {
  let setDate = localStorage.getItem(key);
  if (setDate === null) {
    setDate = encodeURI("{}");
  }
  return JSON.parse(decodeURI(setDate));
}
export { changeFromDate, setLocaStorage, getLoStorage };
