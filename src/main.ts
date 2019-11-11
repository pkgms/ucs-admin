import Vue from 'vue';
import App from './App.vue';
import router from './router';

import store from './store';

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import * as ElementUI from 'element-ui';
import './styles/element-variables.scss';

import './assets/index.css';

import './icons'; // icon
import './permission'; // permission control
import './utils/error-log'; // error log

import { mockXHR } from '../mock/index.js';
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

import '@/styles/index.scss' // global css

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
