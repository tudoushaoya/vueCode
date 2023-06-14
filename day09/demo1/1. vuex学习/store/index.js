import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    count1: 1
  },
  getters: {
    mul (state) {
      return state.count1 * 2
    }
  },
  mutations: {
    add (state, payload) {
      state.count += payload
    },
    reduce (state, payload) {
      state.count -= payload
    }
  },
  actions: {
    addAsync (context) {
      setTimeout(() => {
        context.commit('add', 10)
      }, 1000)
    }
  },
  modules: {
    user
  }
})
