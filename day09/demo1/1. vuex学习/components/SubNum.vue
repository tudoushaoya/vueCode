<template>
  <div>
    减法组件
    <button @click="reduce(3)">-3</button>
    <p>{{ $store.state.count }}</p>
    <button @click="$store.dispatch('addAsync')">等一秒</button>
    <p>{{ mul }}</p>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    return {}
  },
  methods: {
    ...mapMutations(['reduce'])
  },
  computed: {
    ...mapGetters(['mul'])
  }
}
</script>

<style scoped lang='less'></style>
