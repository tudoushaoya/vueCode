<template>
  <div>
    <el-form ref="detailListRef" style="width: 300px; margin-top: 20px" label-width="80px" :model="detailList" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="detailList.username" size="mini" />
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="detailList.workNumber" size="mini" disabled />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="detailList.mobile" size="mini" :disabled="isEdit" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <!-- <el-input v-model="detailList.departmentName" size="mini" /> -->
        <el-cascader v-model="detailList.departmentName" :options="departments" :props="{label:'name',value:'id'}" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="detailList.formOfEmployment">
          <el-option label="正式" :value="1" />
          <el-option label="非正式" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="detailList.timeOfEntry" type="date" clearable placeholder="选择日期" />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="detailList.correctionTime" type="date" clearable placeholder="选择日期" />
      </el-form-item>
      <el-form-item label="头像" prop="staffPhoto">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          accept="image/*"
        >
          <img v-if="detailList.staffPhoto" :src="detailList.staffPhoto" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="姓名">
        <el-button size="mini" type="primary" @click="update">更新</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
// SECRETID 和 SECRETKEY 请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
var cos = new COS({
  SecretId: 'AKIDqfVF8xghtlXCjjYBf0CE5oNyNi3FHFFI',
  SecretKey: 'FPSUQBpS4iT9hBWsDVmGoXH1mSE4yraN'
})
import { getDepartments } from '@/api/department'
import { transListToTree, parseTime } from '@/utils/index.js'
import { getPersonalDetail, addEmployee, updateEmployee } from '@/api/user'
export default {
  name: 'EmployeeDetail',
  data() {
    return {
      detailList: {},
      rules: {
        username: [{ required: true, message: '请输入姓名', trigger: 'blur' }, {
          min: 1, max: 4, message: '姓名为1-4位'
        }],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }, {
        //   pattern 正则表达式
          pattern: /^1[3-9]\d{9}$/,
          message: '手机号格式不正确',
          trigger: 'blur'
        }],
        formOfEmployment: [{ required: true, message: '请选择聘用形式', trigger: 'blur' }],
        departmentId: [{ required: true, message: '请选择部门', trigger: 'blur' }],
        timeOfEntry: [{ required: true, message: '请选择入职时间', trigger: 'blur' }],
        correctionTime: [{ required: true, message: '请选择转正时间', trigger: 'blur' }, {
          validator: (rule, value, callback) => {
            if (this.detailList.timeOfEntry) {
              if (new Date(this.detailList.timeOfEntry) > new Date(value)) {
                callback(new Error('转正时间不能小于入职时间'))
                return
              }
            }
            callback()
          }
        }]
      },
      departments: []
    }
  },
  computed: {
    isEdit() {
      return !!this.$route.params.id
    }
  },
  async created() {
    await this.getDetail()
    await this.getDepartments()
  },
  methods: {
    async getDetail() {
      if (!this.$route.params.id) return
      const res = await getPersonalDetail(this.$route.params.id)
      this.detailList = res
      console.log(this.detailList)
    },
    async getDepartments() {
      const res = await getDepartments()
      this.departments = transListToTree(res, 0)
    },
    async update() {
      const obj = { ...this.detailList }
      obj.departmentId = obj.departmentName.slice(-1)[0]
      obj.timeOfEntry = parseTime(obj.timeOfEntry, '{y}-{m}-{d}')
      if (this.isEdit) {
        await updateEmployee(obj)
        this.$message.success('更新成功')
        this.$router.push('/employee')

        // 清空表单
        // this.$refs.detailListRef.resetFields()
      } else {
        await addEmployee(obj)
        this.$message.success('添加成功')
        // 清空表单
        this.$refs.detailListRef.resetFields()
        this.$router.push('/employee')
      }
    },
    async beforeAvatarUpload(file) {
      try {
        const res = await cos.uploadFile({
          Bucket: 'rzzt-1317097641', /* 填写自己的 bucket，必须字段 */
          Region: 'ap-chengdu', /* 存储桶所在地域，必须字段 */
          Key: 'heima' + +new Date() + file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
          Body: file, // 上传文件对象
          SliceSize: 1024 * 1024 * 5 /* 触发分块上传的阈值，超过5MB 使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */
        })
        console.log(res)
        this.detailList.staffPhoto = 'https://' + res.Location
      } catch (e) {
        console.log(e)
      }
      return false// 阻止上传
    }
  }
}
</script>

<style scoped lang='scss'>
::v-deep .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  ::v-deep .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  ::v-deep .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  ::v-deep .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
