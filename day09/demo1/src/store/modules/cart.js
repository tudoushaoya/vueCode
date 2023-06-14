// 两根线
// 同步：组件 commit -> mutations -> state
// 异步： 组件 dispatch -> actions -> commit -> mutations -> state
import axios from 'axios'
export default {
  // 开启命名空间
  namespaced: true,
  // 放数据的地方
  state: () => ({
    list: []
  }),
  // 相当于组件中计算属性
  getters: {
    total (state) {
      return state.list.reduce((prev, item) => prev + item.count, 0)
    },
    totalPrice (state) {
      return state.list.reduce((prev, item) => prev + item.count * item.price, 0)
    }
  },
  // 这个是唯一修改state中数据地方
  mutations: {
    // setCount(state) {}
    updateList (state, payload) {
      state.list = payload
    }
  },
  // 写异步的ajax的地方
  actions: {
    // store.commit()
    // getData(store){}
    async getCarts (context) {
      const res = await axios.get('http://localhost:3000/cart')
      context.commit('updateList', res.data)
    },
    async changeNum (context, { id, count }) {
      await axios.patch(`http://localhost:3000/cart/${id}`, { count })
      context.dispatch('getCarts')
    }
  }
}
