<template>
  <div>
    测试组件
    <button @click="fn">按钮</button>
  </div>
</template>

<script>
import EventBus from '@/eventBus'
export default {
  data() {
    return {}
  },
  methods: {
    fn() {
      EventBus.$emit('myEvent')
    },
  },
}
</script>

<style scoped></style>
