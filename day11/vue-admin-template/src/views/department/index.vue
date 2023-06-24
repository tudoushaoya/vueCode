<template>
  <div class="container">
    <div class="app-container">
      组织架构
      <el-tree
        :data="departments"
        :props="{ label: 'name' }"
        default-expand-all
        :expand-on-click-node="false"
      >
        <template #default="scope">
          <el-row type="flex" justify="space-between" style="width: 100%">
            <el-col :span="3">
              {{ scope.node.label }}
            </el-col>
            <el-col :span="3" style="text-align: right; margin-right: 30px">
              <span>{{ scope.data.managerName }}</span>
              <el-dropdown
                style="margin-left: 14px"
                @command="handleCommand($event, scope.data.id)"
              >
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                  <el-dropdown-item command="edit">编辑</el-dropdown-item>
                  <el-dropdown-item command="del">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
    <AddDept v-if="dialogVisible" :visible.sync="dialogVisible" :pid="pid" @updateDept="getDepartments" />
  </div>
</template>
<script>
import { getDepartments, delDepartments } from '@/api/department'
import { transListToTree } from '@/utils/index.js'
import AddDept from './components/add-dept.vue'
export default {
  name: 'Department',
  components: {
    AddDept
  },
  data() {
    return {
      departments: [],
      dialogVisible: false,
      pid: null
    }
  },
  async created() {
    await this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const res = await getDepartments()
      console.log(res)
      this.departments = transListToTree(res, 0)
    },
    async handleCommand(type, id) {
      this.pid = id
      if (type === 'add') {
        this.dialogVisible = true
      } else if (type === 'edit') {
        console.log('编辑')
      } else {
        try {
          await this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          await delDepartments(id)
          this.$message.success('删除成功')
          this.getDepartments()
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
}
</script>
