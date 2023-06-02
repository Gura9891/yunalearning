import axios from "axios";
import store from "store";

const axiosClient = axios.create({
  baseURL: "https://elearningnew.cybersoft.edu.vn/api/",
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAwNyIsIkhldEhhblN0cmluZyI6IjE5LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMjk0NDAwMDAwMCIsIm5iZiI6MTY3OTg1MDAwMCwiZXhwIjoxNzAzMDkxNjAwfQ.28D2Nfp6Hy4C5u8pvZDIxH2pzlYoKIqgfsJLI_Dque4",
  },
});

// inrerceptor
axiosClient.interceptors.request.use((config) => {
  // config: nội dung request gửi lên server
  // ta sẽ thay đổi headers trong request trước khi nó được gửi lên server
  const { accessToken } = store.getState().auth.user || {};

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  // thành công
  (response) => {
    // Ta có thể thay đổi response trước khi response được trả ra cho nơi gọi request.
    // response.data: format của axios
    // .content: format của cybersoft
    return response?.data;
  },
  // thất bại
  (error) => {
    // Ta có thể thay đổi error trước khi error được trả ra cho nơi gọi request.
    return Promise.reject(error?.response?.data);
  }
);

export default axiosClient;
