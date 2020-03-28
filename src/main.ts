import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vant from 'vant';
import api from '@/api';
import message from '@/utils/Message';
import utils from '@/utils/utils';
import {Lazyload} from 'vant';
import 'vant/lib/index.css';
import GLOBAL from '@/assets/global/global_variable';

Vue.use(Lazyload);
Vue.use(Vant);

Vue.config.productionTip = false;

Vue.prototype.$Apis = api;
Vue.prototype.$Utils = utils;
Vue.prototype.$Message = message;
Vue.prototype.GLOBAL = GLOBAL;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
