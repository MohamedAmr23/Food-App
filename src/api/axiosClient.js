import axios from "axios";


const axiosClient = axios.create({
    baseURL: "https://upskilling-egypt.com:3006/api/v1",
    // timeout: 5000,
    headers:{
        "Content-Type": "application/json",
    }
})

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  }
);


export default axiosClient