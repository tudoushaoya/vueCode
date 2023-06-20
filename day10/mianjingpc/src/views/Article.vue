<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>面经</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <template #header>
        <el-row type="flex" justify="space-between">
          <el-col :span="3">
            <span> 共{{ total }}条记录 </span>
          </el-col>
          <el-col :span="2">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-plus"
              round
              @click="article = {}.dialogVisible = true"
              >添加面经</el-button
            >
          </el-col>
        </el-row>
      </template>
      <el-table :data="rows">
        <el-table-column label="编号" type="index">
          <template #default="scope">
            {{ (params.current - 1) * params.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="stem"></el-table-column>
        <el-table-column label="作者" prop="creator"></el-table-column>
        <el-table-column label="点赞" prop="likeCount"></el-table-column>
        <el-table-column label="浏览数" prop="views"></el-table-column>
        <el-table-column label="更新时间" prop="createdAt"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              type="text"
              icon="el-icon-view"
              @click="showDrawer(scope.row.id)"
            ></el-button>
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="edit(scope.row.id)"
            ></el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              @click="del(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center">
        <el-pagination
          background
          layout="total, prev, pager, next,sizes, jumper"
          :total="total"
          :page-size="params.pageSize"
          :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
          @current-change="handleChangeCurrent"
          @size-change="handleChangeSzie"
        >
        </el-pagination>
      </div>
    </el-card>
    <el-dialog
      title="添加"
      :visible="dialogVisible"
      width="60%"
      @update:visible="dialogVisible = $event"
      @close="cancel"
    >
      <el-form
        label-width="80px"
        :model="article"
        :rules="articleRules"
        ref="articleForm"
      >
        <el-form-item label="标题" prop="stem">
          <el-input placeholder="请输入标题" v-model="article.stem"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <quill-editor
            v-model="article.content"
            @blur="$refs.articleForm.validateField('content')"
          ></quill-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleConfirm">确认</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-drawer title="查看" :visible.sync="drawer" direction="rtl" size="60%">
      <h3>{{ article.stem }}</h3>
      <div v-html="article.content"></div>
    </el-drawer>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import {
  getArticles,
  deleteArticle,
  addArticle,
  getArticle,
  updateArticle
} from '@/api/article'
export default {
  name: 'ArticlePage',
  async created () {
    await this.getArticles()
  },
  components: {
    quillEditor
  },
  data () {
    return {
      article: {
        stem: '',
        content: ''
      },
      articleRules: {
        stem: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur'
          }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          {
            min: 2,
            max: 200,
            message: '长度在 2 到 200 个字符',
            trigger: 'blur'
          }
        ]
      },
      rows: [],
      total: 0,
      params: {
        current: 1,
        pageSize: 5
      },
      dialogVisible: false,
      isEdit: false,
      drawer: false
    }
  },
  methods: {
    async getArticles () {
      const res = await getArticles(this.params)
      //   console.log(res)
      this.rows = res.data.rows
      this.total = res.data.total
    },
    async handleChangeCurrent (val) {
      this.params.current = val
      await this.getArticles()
    },
    async handleChangeSzie (val) {
      this.params.pageSize = val
      await this.getArticles()
    },
    async del (id) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const res = await deleteArticle(id)
        console.log(res)
        this.$message.success('删除成功!')
        await this.getArticles()
      } catch (error) {
        console.log(error)
      }
    },
    cancel () {
      this.dialogVisible = false
      this.$refs.articleForm.resetFields()
    },
    async handleConfirm () {
      try {
        await this.$refs.articleForm.validate()
        if (this.isEdit) {
          const obj = {
            id: this.article.id,
            stem: this.article.stem,
            content: this.article.content
          }
          await updateArticle(obj)
          this.$message.success('修改成功!')
        } else {
          await addArticle(this.article)
          this.$message.success('添加成功!')
        }
        this.dialogVisible = false
        await this.getArticles()
      } catch (error) {
        console.log(error)
      }
    },
    async edit (id) {
      const res = await getArticle(id)
      this.article = res.data
      this.dialogVisible = true
      this.isEdit = true
    },
    async showDrawer (id) {
      const res = await getArticle(id)
      this.article = res.data
      this.drawer = true
    }
  }
}
</script>

<style scoped lang='scss'>
.el-card {
  box-shadow: none;
  margin-top: 10px;
}
::v-deep .ql-editor {
  min-height: 200px;
}
</style>
