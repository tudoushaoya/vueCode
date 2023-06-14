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

Vue.directive('loading', {
  inserted(el, binding) {
    if (binding.value === true) {
      const div = document.createElement('div')
      div.classList.add('lds-dual-ring')
      el.appendChild(div)
    }
  },
  update(el, binding) {
    if (binding.value === false) {
      const div = el.querySelector('.lds-dual-ring')
      div.remove()
    }
  },
})

new Vue({
  render: (h) => h(App),
}).$mount('#app')
// 定义一个全局指令
