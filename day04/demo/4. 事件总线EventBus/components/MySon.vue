<template>
  <div>孙组件--{{ msg }}</div>
</template>

<script>
import EventBus from '@/eventBus'
export default {
  created() {
    EventBus.$on('myEvent', () => {
      console.log('孙组件接收到了消息')
    })
  },
  inject: {
    msg: {
      type: String,
    },
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped></style>
