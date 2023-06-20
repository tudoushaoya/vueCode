<template>
  <div>
    <el-row>
  <el-button disabled>默认按钮</el-button>
  <el-button type="primary" >主要按钮</el-button>
  <el-button type="success" disabled>成功按钮</el-button>
  <el-button type="info" disabled>信息按钮</el-button>
  <el-button type="warning" disabled>警告按钮</el-button>
  <el-button type="danger" disabled>危险按钮</el-button>
</el-row>
<hr>
<i class="el-icon-trophy"></i>\
<hr>
<el-input v-model="msg" clearable style="width:400px;" prefix-icon="el-icon-apple" suffix-icon="el-icon-sugar"></el-input>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: ''
    }
  },
  methods: {}
}
</script>

<style scoped lang='scss'></style>
