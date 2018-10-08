import api from "./service";

// 倒入所有介面
const install = Vue => {
  if (install.installed) return;
  install.installed = true;
  Object.defineProperties(Vue.prototype, {
    $api: {
      get() {
        return api;
      }
    }
  });
};

export default install;
