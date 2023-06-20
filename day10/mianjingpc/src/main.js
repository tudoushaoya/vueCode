import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/element-variables.scss'
import 'reset-css'
import TablePage from '@/components/TablePage'
Vue.use(ElementUI)
Vue.component('TablePage', TablePage)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
