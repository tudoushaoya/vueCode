<template>
  <div class="container">
    <div class="app-container">
      <el-card>
        <el-button type="primary" size="mini" @click="add">添加角色</el-button>
        <el-table :data="roles" border style="margin-top: 30px">
          <el-table-column prop="name" label="角色" />
          <el-table-column prop="state" label="启用">
            <template #default="scope">
              {{ scope.row.state ? "已启用" : "未启用" }}
            </template>
          </el-table-column>
          <el-table-column prop="description" label="描述" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button type="text" size="mini">分配权限</el-button>
              <el-button type="text" size="mini">编辑</el-button>
              &nbsp;&nbsp;
              <el-popconfirm
                icon="el-icon-info"
                icon-color="red"
                title="确定要删除吗？"
                @onConfirm="handleDel(scope.row.id)"
              >
                <template #reference>
                  <el-button
                    slot="reference"
                    type="text"
                    size="mini"
                  >删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: right">
          <el-pagination
            layout="prev, pager, next, jumper, sizes"
            :total="total"
            :page-size="roleParams.pagesize"
            :page-sizes="[5, 10, 20, 50]"
            @current-change="handlePageChange"
            @size-change="handleSizeChange"
          />
        </div>
      </el-card>
    </div>
    <el-dialog :visible.sync="dialogVisible" title="新增角色">
      <el-form
        label-width="80px"
        :model="addForm"
        :rules="addFormRules"
      >
        <el-form-item prop="name" label="角色名称">
          <el-input v-model="addForm.name" />
        </el-form-item>
        <el-form-item label="启用" prop="state">
          <el-switch
            v-model="addForm.state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
        <el-form-item prop="description" label="角色描述">
          <el-input v-model="addForm.description" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="addRole">确定</el-button>
          <el-button size="mini">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getRoleList, delRole, addRole } from '@/api/role'
export default {
  name: 'Role',
  data() {
    return {
      roles: [],
      roleParams: {
        page: 1,
        pagesize: 5
      },
      total: null,
      dialogVisible: false,
      value: true,
      addForm: {
        name: '',
        description: '',
        state: null
      },
      addFormRules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请选择是否启用', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getRoles()
  },
  methods: {
    async getRoles() {
      const res = await getRoleList(this.roleParams)
      this.roles = res.rows
      console.log(this.roles)
      this.total = res.total
    },
    handlePageChange(page) {
      this.roleParams.page = page
      this.getRoles()
    },
    handleSizeChange(size) {
      this.roleParams.pagesize = size
      this.getRoles()
    },
    async handleDel(id) {
      await delRole(id)
      this.$message({
        type: 'success',
        message: '删除成功'
      })
      this.getRoles()
    },
    add() {
      this.dialogVisible = true
    },
    async addRole() {
      this.addForm.state = this.addForm.state ? 1 : 0
      await addRole(this.addForm)
      this.$message({
        type: 'success',
        message: '添加成功'
      })
      console.log(this.addForm)
      this.addForm = {
        name: '',
        description: '',
        state: null
      }
      this.dialogVisible = false
      this.getRoles()
    }
  }
}
</script>
