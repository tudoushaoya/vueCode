<template>
  <div class="container">
    <div class="app-container">
      <el-row>
        <el-col
          :span="4"
          style="border-right: 1px solid #000; min-height: calc(100vh - 88px)"
        >
          <el-input
            v-model="keyword"
            prefix-icon="el-icon-search"
            placeholder="输入员工姓名全员搜索"
            size="mini"
          />
          <el-tree
            ref="tree"
            :data="departments"
            :props="{ label: 'name' }"
            default-expand-all
            :expand-on-click-node="false"
            highlight-current
            node-key="id"
            @current-change="handleCurrentChange"
          /></el-col>
        <el-col :span="20">
          <div style="text-align: right">
            <el-button size="mini" type="primary" @click="$router.push(`/employee/detail`)">添加员工</el-button>
            <el-button size="mini" @click="show=true">excel导入</el-button>
            <el-button size="mini" @click="exportExcel">excel导出</el-button>
          </div>
          <el-table :data="employeeRows">
            <el-table-column prop="name" label="头像">
              <template #default="scope">
                <el-avatar
                  v-if="scope.row.staffPhoto"
                  :src="scope.row.staffPhoto"
                  :size="50"
                />
                <span
                  v-else
                  style="
                    display: block;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: skyblue;
                    line-height: 40px;
                    text-align: center;
                    color: #000;
                  "
                >{{ scope.row.username.charAt(0) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="username" label="姓名" />
            <el-table-column prop="mobile" label="手机号" sortable />
            <el-table-column prop="phone" label="工号" />
            <el-table-column prop="email" label="聘用形式" />
            <el-table-column prop="entryTime" label="部门" />
            <el-table-column prop="status" label="入职时间" />
            <el-table-column prop="operation" label="操作">
              <template #default="scope">
                <el-button type="text" @click="$router.push(`/employee/detail/${scope.row.id}`)">查看</el-button>
                <el-button type="text" @click="showRole(scope.row.id)">角色</el-button>
                <el-button v-permission="'user_delete'" type="text">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <EmployeeImport :visible.sync="show" @getEmployeeList="getEmployeeList" />
    <el-dialog title="分配角色" width="50%" :visible.sync="roleVisible">
      <el-form>
        <el-form-item>
          <el-checkbox-group v-model="selectRole">
            <el-checkbox v-for="item in roleRows" :key="item.id" :label="item.id">
              {{ item.name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handelConfim">确定</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
// let tiemr = null
import { getDepartments } from '@/api/department'
import { transListToTree } from '@/utils/index.js'
import { getEmployeeList, exportExcel, getPersonalDetail, addEmployeeRole } from '@/api/user'
import debounce from 'lodash/debounce'
import { saveAs } from 'file-saver'
import EmployeeImport from './components/EmployeeImport.vue'
import { getRoleList } from '@/api/role'
export default {
  name: 'Employee',
  components: {
    EmployeeImport
  },
  data() {
    return {
      departments: [],
      employeeParams: {
        pageNum: 1,
        pageSize: 10
      },
      employeeRows: [],
      employeeTotal: null,
      keyword: '',
      show: false,
      roleVisible: false,
      selectRole: [],
      roleRows: [],
      id: null
    }
  },
  watch: {
    // keyword(newVal) {
    //   clearTimeout(tiemr)
    //   tiemr = setTimeout(() => {
    //     console.log(newVal)
    //   }, 500)
    // }
    keyword: debounce(function(newVal) {
      this.employeeParams.keyword = newVal
      this.getEmployeeList()
    }, 500)
  },
  async created() {
    await this.getDepartments()
    this.$refs.tree.setCurrentKey(this.departments[0].id)
    this.getEmployeeList()
  },
  methods: {
    async getDepartments() {
      const res = await getDepartments()
      this.departments = transListToTree(res, 0)
    },
    handleCurrentChange(data) {
      // this.$refs.tree.setCurrentKey(data.id)
      console.log(data)
      this.employeeParams.departmentId = data.id
      this.getEmployeeList()
    },
    async getEmployeeList() {
      const res = await getEmployeeList(this.employeeParams)
      console.log(res)
      this.employeeRows = res.rows
      this.employeeTotal = res.userTotal
    },
    async exportExcel() {
      const res = await exportExcel(this.employeeParams)
      // const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
      // const link = document.createElement('a')
      // link.href = URL.createObjectURL(blob)
      // link.download = '员工列表.xlsx'
      // link.click()
      // URL.revokeObjectURL(link.href)
      saveAs(res, '员工列表.xlsx')
    },
    async showRole(id) {
      const res = await getRoleList({ page: 1, pageSize: 100 })
      this.roleRows = res.rows
      const result = await getPersonalDetail(id)
      this.id = id
      console.log(result)
      this.selectRole = result.roleIds
      this.roleVisible = true
    },
    async handelConfim() {
      const res = await addEmployeeRole({ roleIds: this.selectRole, id: this.id })
      console.log(res)
      this.roleVisible = false
    }
  }
}
</script>
