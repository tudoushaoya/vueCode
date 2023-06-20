// 两根线
// 同步：组件 commit -> mutations -> state
// 异步： 组件 dispatch -> actions -> commit -> mutations -> state
import { signin } from '@/api/user'
// import { setToken, getToken } from '@/utils/storage'
export default {
  // 开启命名空间
  namespaced: true,
  // 放数据的地方
  state: () => ({
    token: ''
  }),
  // 相当于组件中计算属性
  getters: {},
  // 这个是唯一修改state中数据地方
  mutations: {
    updateToken (state, data) {
      state.token = data
    //   setToken(data)
    }
    // setCount(state) {}
  },
  // 写异步的ajax的地方
  actions: {
    // store.commit()
    // getData(store){}
    async signin (context, data) {
      const res = await signin(data)
      console.log(res)
      context.commit('updateToken', res.data.token)
    }
  }
}
