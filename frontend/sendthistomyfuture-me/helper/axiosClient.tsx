import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://api.sendthistomyfuture.me/api",
});
export { axiosClient };