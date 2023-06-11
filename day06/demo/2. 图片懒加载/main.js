import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.directive('lazy', {
  inserted(el, binding) {
    // 检测当前这个图片有没有到可视区，如果到了可视区，九八v-lazy后面的值赋值给src
    // timer一开始是null
    // 500ms只做一次   节流
    // 这是一个闭包
    // 闭包可以实现防抖和节流
    let timer = null
    window.onscroll = function () {
      if (timer) return // 第一次的时候这个代码是不执行的，所以执行下面的代码  setTimeout返回当前定时器id值 1 2 3
      timer = setTimeout(() => {
        if (
          el.offsetTop <=
          document.documentElement.clientHeight +
            document.documentElement.scrollTop
        ) {
          el.src = binding.value
          window.onscroll = null
        }
        timer = null
      }, 500)
    }
  },
})
new Vue({
  render: (h) => h(App),
}).$mount('#app')
