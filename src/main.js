import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/index.js'
import store from '@/store/index.js'

Vue.config.productionTip = false

import less from 'less'
Vue.use(less)

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import fx67llVueUI from 'fx67ll-vue-ui'
Vue.use(fx67llVueUI)

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
