import Vue from 'vue';
import App from './App.vue';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@mdi/font/css/materialdesignicons.css';

const isDevelopment = process.env.NODE_ENV !== 'production';

Vue.config.productionTip = false;
Vue.config.devtools = isDevelopment;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
