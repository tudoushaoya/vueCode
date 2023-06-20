// 两根线
// 同步：组件 commit -> mutations -> state
// 异步： 组件 dispatch -> actions -> commit -> mutations -> state
export default {
  // 开启命名空间
  namespaced: true,
  // 放数据的地方
  state: {},
  // 相当于组件中计算属性
  getters: {},
  // 这个是唯一修改state中数据地方
  mutations: {
    // setCount(state) {}
  },
  // 写异步的ajax的地方
  actions: {
    // store.commit()
    // getData(store){}
    async login(context, payload) {
      console.log(payload)
    }
  }
}
