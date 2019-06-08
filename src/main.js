import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Fragment from 'vue-fragment'

Vue.config.productionTip = false

Vue.use(Fragment.Plugin)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
