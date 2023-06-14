import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const store = new Vuex.Store({
  strict: true,
  state: {
    count: 0,
    num: 999,
    list: [
      {
        id: 1,
        name: "张三",
        done: false,
      },
      {
        id: 2,
        name: "李四",
        done: true,
      },
      {
        id: 3,
        name: "王五",
        done: false,
      },
    ],
  },
  getters: {
    doneList(state) {
      return state.list.filter((item) => item.done === false);
    },
  },
  mutations: {
        add(state) {
          state.count++
        },
        reduce(state) {
          state.count--
          if (state.count < 0) {
            state.count = 0
          }
        },
        addNum(state, payload) {
            state.count += payload
        },
        reduceNum(state, payload) {
            state.count -= payload
            if (state.count < 0) {
              state.count = 0
            }
        }
  },
});
export default store;
