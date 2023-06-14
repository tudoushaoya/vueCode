<template>
  <div>
    <AddNum></AddNum>
    <hr>
    <SubNum></SubNum>
    <p>{{ $store.state.user.token }}</p>
    <p>{{ $store.getters['user/num'] }}</p>
    <button @click="$store.commit('user/fn','skybule')">添加数组一项</button>
    <button @click="$store.dispatch('user/fnAsync')">再增加一项</button>
  </div>
</template>

<script>
import AddNum from '@/components/AddNum.vue'
import SubNum from '@/components/SubNum.vue'
export default {
  components: {
    AddNum,
    SubNum
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang='less'></style>
