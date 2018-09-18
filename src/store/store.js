import Vue from 'vue';
import Vuex from 'vuex';
// import modules from './modules';
import { modules } from '../register';

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
});
