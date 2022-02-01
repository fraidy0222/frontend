import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axiosSetUp from "./axios-api";
import vuetify from './plugins/vuetify'
import vuescroll from 'vuescroll';


Vue.use(vuescroll, {
  name: 'myScroll'
})

axiosSetUp()
Vue.prototype.$vuescrollConfig = ({
  bar: {
    background: '#9E9E9E'
  },
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
