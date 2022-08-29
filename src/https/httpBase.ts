import axios from "axios";
import baseInfo from "./baseInfo";
let basehttp = axios.create({
  timeout: 0,
  baseURL: baseInfo.baseUrl,
});
export default basehttp;
