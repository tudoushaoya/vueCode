<template>
  <div>
    加法组件
    <button @click="add(3)">+3</button>
    <p>{{ $store.state.count }}</p>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {}
  },
  methods: {
    ...mapMutations(['add'])
  },
  computed: {
  }
}
</script>

<style scoped lang='less'></style>
