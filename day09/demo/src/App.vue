<template>
  <div>
    <button @click="add">+1</button>
    <button @click="reduce">-1</button>
    <button @click="addNum(2)">+2</button>
    <button @click="reduceNum(2)">-2</button>
    <p>{{ count }}</p>
    <p>{{ num }}</p>
    <p>{{ doneList[0].name }}</p>
  </div>
</template>

<script>
// 导入mapstate
import { mapState,mapGetters,mapMutations } from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {
    // add() {
    //   this.$store.commit('add')
    // },
    // reduce() {
    //   this.$store.commit('reduce')
    // },
    // addNum(num) {
    //   this.$store.commit('addNum', num)
    // },
    // reduceNum(num) {
    //   this.$store.commit('reduceNum', num)
    // },
    ...mapMutations(['add', 'reduce', 'addNum', 'reduceNum'])
  },
  // computed: mapState(['count', 'num'])                                                                                                                                                                                                                                                   
  // computed: mapState({
  //   count: state => state.count,
  //   num: state => state.num
  // })
  computed: {
    ...mapState(['count', 'num']),
    ...mapGetters(['doneList'])
  },
}
</script>

<style scoped></style>
