<template>
  <div class="box">
    <el-card>
        <template #header>
                黑马面经运营后台
        </template>
        <el-form  :rules="signinfromRules" :model="signinfrom" ref="signinRef">
            <el-form-item label="用户名" prop="username">
                <el-input placeholder="请输入用户名" v-model.trim="signinfrom.username" ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input placeholder="请输入密码" v-model.trim="signinfrom.password" type="password" @keyup.enter.native="signin"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="signin">登录</el-button>
                <el-button @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      signinfrom: {
        username: '',
        password: ''
      },
      signinfromRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 5, max: 11, message: '长度在 5 到 11 之间', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9_]{5,11}$/, message: '用户名必须是5-11位的数字或字母下划线', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 5, max: 11, message: '长度在 5 到 11 之间', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9_]{5,11}$/, message: '密码必须是5-11位的数字或字母下划线', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async signin () {
      try {
        await this.$refs.signinRef.validate()
        await this.$store.dispatch('user/signin', this.signinfrom)
        this.$message.success('登录成功')
        this.$router.push('/dashboard')
      } catch (error) {
        console.log(error)
      }
    },
    reset () {
      this.$refs.signinRef.resetFields()
    }
  }
}
</script>

<style scoped lang='scss'>
.box {
  width: 100vw;
  height: 100vh;
  background: url("@/assets/login-bg.svg") no-repeat center;
  background-size: cover;
  display: flex;
    justify-content: center;
    align-items: center;
}
.el-card {
    width: 420px;
    height: 390px;

}
::v-deep .el-card__header {
    background-color: #766fef;
    color: #fff;
    text-align: center;
}
</style>
