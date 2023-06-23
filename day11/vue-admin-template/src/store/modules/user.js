// 两根线
// 同步：组件 commit -> mutations -> state
// 异步： 组件 dispatch -> actions -> commit -> mutations -> state
import { login, getInfo } from '@/api/user'
import { setToken, getToken, removeToken } from '@/utils/auth'
export default {
  // 开启命名空间
  namespaced: true,
  // 放数据的地方
  state: () => ({
    token: getToken() || '',
    userinfo: {}
  }),
  // 相当于组件中计算属性
  getters: {},
  // 这个是唯一修改state中数据地方
  mutations: {
    // setCount(state) {}
    setToken(state, payload) {
      state.token = payload
      setToken(payload)
    },
    setUserInfo(state, payload) {
      state.userinfo = payload
    }
  },
  // 写异步的ajax的地方
  actions: {
    // store.commit()
    // getData(store){}
    async login(context, payload) {
      const res = await login(payload)
      context.commit('setToken', res)
    },
    async getInfo(context, payload) {
      const res = await getInfo()
      console.log(res)
      context.commit('setUserInfo', res)
    },
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      removeToken()
    }
  }
}
