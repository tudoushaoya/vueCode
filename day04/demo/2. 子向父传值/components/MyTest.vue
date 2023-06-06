<template>
  <div>
    <button @click="$emit('my-click', 20)">测试按钮</button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped></style>
