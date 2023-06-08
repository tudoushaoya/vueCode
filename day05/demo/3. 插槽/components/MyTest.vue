<template>
  <div>
    <!-- 测试组件 <slot>未知</slot> -->
    <slot name="left"></slot>
    <slot name="right"></slot>
    <slot name="default"></slot>
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
