<template>
  <div>
    <input type="text" v-focus />
  </div>
</template>

<script>
// 自定义指令有两种，一种是全局指令，一种是局部指令，全局指令在main.js中定义，局部指令在组件中定义
export default {
  // mounted() {
  //   this.$refs.myinput.focus()
  // },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped></style>
