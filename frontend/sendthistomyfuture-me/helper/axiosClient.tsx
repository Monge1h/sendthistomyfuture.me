import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api.sendthistomyfuture.me/api",
});
export { axiosClient };