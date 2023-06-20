<template>
  <el-container class="box">
  <el-aside width="200px" style="background: red;">Aside</el-aside>
  <el-container>
    <el-header style="background: blue;">Header</el-header>
    <el-main style="background: green;">Main</el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {}
}
</script>

<style scoped lang='scss'>
*{
  margin: 0;
  padding: 0;
}
.box{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
