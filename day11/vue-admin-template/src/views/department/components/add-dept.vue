<template>
  <el-dialog
    ref="addFormRef"
    :title="title"
    :visible="visible"
    @close="$emit('update:visible', false)"
  >
    <el-form
      v-loading="loading"
      label-width="100px"
      :model="addForm"
      :rules="addFormRules"
    >
      <el-form-item prop="name" label="部门名称">
        <el-input v-model="addForm.name" placeholder="2-10个字符" />
      </el-form-item>
      <el-form-item prop="code" label="部门编码">
        <el-input v-model="addForm.code" placeholder="2-10个字符" />
      </el-form-item>
      <el-form-item prop="managerId" label="部门负责人" clearable>
        <el-select
          v-model="addForm.managerId"
          style="width: 100%"
          placeholder="请选择负责人"
          clearable
        >
          <el-option
            v-for="item in managers"
            :key="item.id"
            :value="item.id"
            :label="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="introduce" label="部门介绍">
        <el-input
          v-model="addForm.introduce"
          placeholder="2-100个字符"
          type="textarea"
          maxlength="100"
          minlength="2"
          show-word-limit
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="mini"
          @click="handleConfirm"
        >确认</el-button>
        <el-button size="mini" @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {
  getDepartmentDetail,
  getDepartments,
  addDepartments,
  getDepartmentInfo,
  updateDepartments
} from '@/api/department'
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    pid: {
      type: Number,
      required: true
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      addForm: {
        name: '',
        code: '',
        managerId: '',
        introduce: ''
      },
      managers: [],
      addFormRules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'blur'
          },
          // 自定义校验规则，校验部门名称是否重复
          {
            validator: (rule, value, callback) => {
              // 校验部门名称是否重复
              if (this.isEdit) {
                const arr = this.depts
                  .filter((item) => item.pid === this.addForm.pid && item.id !== this.addForm.id)
                  .filter((item) => item.id !== this.addForm.id)
                return arr.some((item) => item.name === value)
                  ? callback(new Error('部门名称重复'))
                  : callback()
              } else {
                return this.depts
                  .filter((item) => item.pid === this.pid)
                  .some((item) => item.name === value)
                  ? callback(new Error('部门名称重复'))
                  : callback()
              }
            },
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'blur'
          },
          // 自定义校验规则，校验部门编码是否重复
          {
            validator: (rule, value, callback) => {
              // 校验部门编码是否重复
              if (this.isEdit) {
                const arr = this.depts
                  .filter((item) => item.pid === this.addForm.pid && item.id !== this.addForm.id)
                  .filter((item) => item.id !== this.addForm.id)
                return arr.some((item) => item.code === value)
                  ? callback(new Error('部门编码重复'))
                  : callback()
              } else {
                return this.depts
                  .filter((item) => item.pid === this.pid)
                  .some((item) => item.code === value)
                  ? callback(new Error('部门编码重复'))
                  : callback()
              }
            },
            trigger: 'blur'
          }
        ],
        managerId: [
          { required: true, message: '请选择部门负责人', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '请输入部门介绍', trigger: 'blur' },
          {
            min: 2,
            max: 100,
            message: '长度在 2 到 100 个字符',
            trigger: 'blur'
          }
        ]
      },
      depts: [],
      loading: true
    }
  },
  computed: {
    title() {
      return this.isEdit ? '编辑部门' : '新增部门'
    }
  },
  async created() {
    if (this.isEdit) {
      this.addForm = await getDepartmentInfo(this.pid)
    }
    this.loading = false
    await this.getDepartmentDetail()
    this.depts = await getDepartments()
  },
  methods: {
    async getDepartmentDetail() {
      this.managers = await getDepartmentDetail()
    },
    async handleConfirm() {
      if (this.isEdit) {
        await this.handleUpdate()
      } else {
        this.addForm.pid = this.pid
        await addDepartments(this.addForm)
        this.$message.success('添加成功')
        this.$emit('update:visible', false)
        this.$emit('updateDept')
      }
    },
    close() {
      this.$emit('update:visible', false)
    },
    async handleUpdate() {
      await updateDepartments(this.addForm)
      this.$message.success('修改成功')
      this.$emit('update:visible', false)
      this.$emit('updateDept')
    }
  }
}
</script>

<style scoped lang='scss'></style>
