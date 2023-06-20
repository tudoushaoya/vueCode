import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user
  },
  plugins: [vuexLocal.plugin]
})
