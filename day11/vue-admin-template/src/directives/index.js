import Vue from 'vue'
import store from '@/store'
Vue.directive('permission', {
  inserted(el, binding) {
    if (!store.state.user.userinfo?.roles?.points.includes(binding.value)) {
      el.remove()
    }
  }
})
