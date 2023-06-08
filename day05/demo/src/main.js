import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.directive('focus', {
  inserted(el) {
    el.focus()
  },
})

Vue.directive('color', {
  inserted(el, binding) {
    el.style.color = binding.value
  },
})
Vue.directive('validate', {
  inserted(el, binding) {
    if (binding.value.length >= 6) {
      el.style.color = 'green'
    } else {
      el.style.color = 'red'
    }
  },
  update(el, binding) {
    if (binding.value.length >= 6) {
      el.style.color = 'green'
    } else {
      el.style.color = 'red'
    }
  },
})
new Vue({
  render: (h) => h(App),
}).$mount('#app')
// 定义一个全局指令
