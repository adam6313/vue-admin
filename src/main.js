import Vue from 'vue';
import App from './App.vue';
import store from './store/store';
import i18n from './plugins/i18n';
import api from './api';
import router from './router';
import './registerServiceWorker';
import './plugins/iview';

Vue.config.productionTip = false;
Vue.use(api);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");