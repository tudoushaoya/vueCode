export default {
  namespaced: true,
  state: () => ({
    token: '123456',
    list: ['red', 'green', 'blue']
  }),
  mutations: {
    fn (state, payload) {
      state.list.push(payload)
    }
  },
  getters: {
    num (state) {
      return state.list.length
    }
  },
  actions: {
    fnAsync (context) {
      setTimeout(() => {
        context.commit('fn', 'yellow')
      }, 1000)
    }
  }
}
