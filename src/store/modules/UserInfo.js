import types from '../mutation-types';

const state = {
    userInfo: {},
};
  
const mutations = {
  [types.USERINFO](state, userInfo) {
    state.userInfo = userInfo;
  },
};

const actions = {
  /**
   * set userInfo
   * @param { String } userInfo userInfo
   */
  Action_SetUserInfo({ commit }, userInfo) {
    commit(types.USERINFO, userInfo);
  },
  /**
   * reset userInfo
   */
  Action_RestUserInfo({ commit }) {
    commit(types.USERINFO, '');
  },
};

const getters = {
  Getter_userInfo: state => state.userInfo,
};

export default {
  state,
  mutations,
  actions,
  getters,
};