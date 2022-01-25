import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axiosSetUp from "./axios-api";
import vuetify from './plugins/vuetify'

axiosSetUp()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
