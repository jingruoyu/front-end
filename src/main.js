// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import routes from './router'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import vuexStore from './vuex.js'

Vue.use(Vuex)
Vue.use(VueRouter)

const router = new VueRouter({
	mode:'history',
	routes
})

const store = new Vuex.Store(vuexStore)

router.beforeEach((to,from,next)=>{
	console.log(to);
	document.title = to.meta.title;
	next();
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
