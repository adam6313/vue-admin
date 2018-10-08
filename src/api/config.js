export default {
  method: "post",
  baseURL: "/api",
  transformRequest: [
    function(data, headers) {
      headers["Authorization"] = localStorage.getItem("token");
      return data;
    }
  ],
  headers: {
    "Content-Type": "multipart/form-data"
  },
  // 攜帶憑證
  withCredentials: false,
  // 返回資料型別
  responseType: "json"
};
