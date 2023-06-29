<template>
  <div class="container">
    <div class="app-container">
      <el-button type="primary" size="mini">添加权限</el-button>
      <el-table :data="permissionList" row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <template #empty>
          <el-empty description="没有数据" />
        </template>
        <el-table-column label="名称" prop="name" />
        <el-table-column label="标识" prop="code" />
        <el-table-column label="描述" prop="description" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button v-if="scope.row.type===1" type="text" size="mini">添加</el-button>
            <el-button type="text" size="mini">编辑</el-button>
            <el-button type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { getPermissionList } from '@/api/permission'
export default {
  name: 'Permission',
  data() {
    return {
      permissionList: []
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      const res = await getPermissionList()
      console.log(res)
      this.permissionList = res
    }
  }
}
</script>
