<template>
  <el-dialog
    title="员工导入"
    width="30%"
    :visible="visible"
    @close="$emit('update:visible', false)"
  >
    <input ref="file" type="file" accept=".xlsx, .xls" @change="handelChange">
    <div class="area" @drop="handleDrop" @dragover="handleDaragover" @dragenter="handleDaragover">
      <i class="el-icon-upload" style="font-size: 50px" />
      <p><a href="javascript:;" style="color:blue;" @click="importExcel">下载导入模板</a></p>
      <p>将文件拖到此处或<a href="javascript:;" style="color:blue;" @click="$refs.file.click()">点击上传</a></p>
    </div>
    <div style="text-align: right">
      <el-button type="primary" size="mini">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { importTemplate, importUsers } from '@/api/user'
import { saveAs } from 'file-saver'
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    async importExcel() {
      const file = await importTemplate()
      saveAs(file, '员工导入模板.xlsx')
    },
    async handelChange(e) {
      const file = e.target.files
      if (file.length === 0) {
        return this.$message.error('请选择文件')
      }
      console.log(file[0])
      await this.upload(file[0])
    },
    async upload(file) {
      this.$refs.file.value = ''
      const fd = new FormData()
      fd.append('file', file)
      await importUsers(fd)
      this.$message.success('批量导入成功')
      this.$emit('update:visible', false)
      this.$emit('getEmployeeList')
    },
    async handleDrop(e) {
      e.preventDefault()
      const file = e.dataTransfer.files
      if (file.length === 0) {
        return this.$message.error('请选择文件')
      }
      console.log(file[0])
      await this.upload(file[0])
    },
    handleDaragover(e) {
      e.preventDefault()
    }
  }
}
</script>

<style scoped lang='scss'>
.area {
  width: 300px;
  height: 140px;
  border: 1px dashed #ccc;
  margin: 0 auto;
  text-align: center;
}
input[type="file"] {
  display: none;
}
</style>
