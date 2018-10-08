/* eslint-disable no-multi-spaces */
/* eslint-disable key-spacing  */

const ErrorCode = {
  100: "NetworkError", // error
  200: "success", // success
  400: "NetworkError", // 請求錯誤
  401: "NetworkError", // 未授權
  403: "NetworkError", // 拒絕訪問
  404: "NetworkError", // 請求錯誤, 未找到該資源
  405: "NetworkError", // 請求方法未准許
  408: "NetworkError", // 請求超時
  500: "NetworkError", // 請求錯誤
  501: "NetworkError", // 網路未實現
  502: "NetworkError", // 網路錯誤
  503: "NetworkError", // 服務不可用
  504: "NetworkError", // 網路超時
  505: "NetworkError" // http版本不支持該請求
};

export default code => {
  code = `${code}`.replace(/[^0-9]/g, "");
  return Object.prototype.hasOwnProperty.call(ErrorCode, code)
    ? ErrorCode[code]
    : ErrorCode[100];
};
