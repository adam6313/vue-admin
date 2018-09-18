import Vue from 'vue';
import Router from 'vue-router';
import routes from 'vue-auto-routing';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: () => import('@/views/Login'),
    }, {
      path: '/',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard'),
      children: routes,
    }, {
      path: '/*',
      redirect: '/Login',
    },
  ],
});
