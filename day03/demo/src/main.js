import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
// 配置全局组件
import MyTest from './components/myest.vue'
Vue.component('MyTest', MyTest)
// 配置全局样式
import './style/index.css'
new Vue({
  render: h => h(App)
}).$mount('#app')