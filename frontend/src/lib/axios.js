import axios from "axios";

const axiosInstance = axios.create({
  baseURL:"http://3.80.154.24:3000",
  withCredentials: true,
});

export default axiosInstance;
