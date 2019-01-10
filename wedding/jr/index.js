import 'babel-polyfill';

import './utilities/icons';
import 'bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/freelancer/css/freelancer.css';
import 'fullcalendar/dist/fullcalendar.css';
import 'vue-swatches/dist/vue-swatches.min.css';
import 'flatpickr/dist/flatpickr.css';
import './assets/app.scss';

import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VTooltip from 'v-tooltip';
import VeeValidate from 'vee-validate';
import vueMoment from 'vue-moment';
import Vuex from 'vuex';
import {
  sync,
} from 'vuex-router-sync';
import BootstrapVue from 'bootstrap-vue';
import VueMask from 'v-mask';
import App from './components/app.vue';
import routerO from './utilities/router';
import storeO from './utilities/store';
import 'utilities/lodash';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}

Vue.use(VueMask);
Vue.use(BootstrapVue);
Vue.use(Vuex);
Vue.use(VeeValidate);
Vue.use(VTooltip);
Vue.use(VueAxios, axios);
Vue.use(VueRouter);
Vue.use(vueMoment);

// set store and router
const store = new Vuex.Store(storeO);
const router = new VueRouter(routerO);
sync(store, router);

App.methods.initialize(Vue, router, store, Vue.axios);
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});