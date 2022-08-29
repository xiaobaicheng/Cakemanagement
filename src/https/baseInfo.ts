import axios  from "axios";
  let baseURL = "http://127.0.0.1:4002"
const baseInfo = {
  baseUrl: "http://127.0.0.1:4002",
  // baseUrl: "http://localhost:8082/videostore",
  timeout: 5000,
};

const requset = axios.create({
  timeout: 3000,
  baseURL: baseURL,
});
export  {requset,baseURL}
