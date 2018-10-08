import { Post } from "./instance";
import router from "./router";

export default {
  /**
   * Login
   * @param { Object } param account, password
   */
  Login: param => Post(router.LOGIN, param)
};
