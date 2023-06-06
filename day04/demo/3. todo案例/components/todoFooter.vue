<template>
  <footer class="footer" v-show="list.length > 0">
    <!-- 统计 -->
    <span class="todo-count"
      >合 计:<strong> {{ num }} </strong></span
    >
    <!-- 清空 -->
    <button class="clear-completed" @click="delAll">清空任务</button>
  </footer>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {}
  },
  methods: {
    delAll() {
      this.$emit('my-del-all')
    },
  },
  computed: {
    num() {
      return this.list.length
    },
  },
}
</script>

<style scoped></style>
