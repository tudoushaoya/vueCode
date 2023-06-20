<template>
  <div class="login-container">
    <div class="logo" />
    <div class="form">
      <h1>登录</h1>
      <el-card shadow="never" class="login-card">
        <!--登录表单-->
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
          <el-form-item prop="mobile">
            <el-input v-model="loginForm.mobile" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" :type="open?'text':'password'">
              <template #suffix>
                <svg-icon :icon-class="open?'eye-open':'eye'" style="cursor: pointer;" @click.native="open=!open" />
              </template></el-input>
          </el-form-item>
          <el-form-item prop="isAgree">
            <el-checkbox v-model="loginForm.isAgree">用户平台使用协议</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    const validateAgree = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请勾选用户平台使用协议'))
      }
      callback()
    }
    return {
      loginForm: {
        mobile: '13800000002',
        password: 'hm#qd@23!',
        isAgree: false
      },
      loginFormRules: {
        mobile: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        isAgree: [
          // 自定义校验，如果不是非空校验，可以不写 trigger
          {
            // validator(rule, value) {
            //   if (!value) {
            //     return Promise.reject('请勾选用户平台使用协议')
            //   }
            //   return Promise.resolve()
            // },
            validator: validateAgree,
            trigger: 'change'
          }
        ]
      },
      open: false
    }
  },
  methods: {
    async login() {
      try {
        await this.$refs.loginFormRef.validate()
        const obj = { ...this.loginForm }
        delete obj.isAgree
        await this.$store.dispatch('user/login', obj)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang="scss">
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;
  .logo {
    flex: 3;
    background: rgba(38, 72, 176) url(../../assets/common/login_back.png)
      no-repeat center / cover;
    border-top-right-radius: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 0 100px;
    .icon {
      background: url(../../assets/common/logo.png) no-repeat 70px center /
        contain;
      width: 300px;
      height: 50px;
      margin-bottom: 50px;
    }
    p {
      color: #fff;
      font-size: 18px;
      margin-top: 20px;
      width: 300px;
      text-align: center;
    }
  }
  .form {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 176px;
    .el-card {
      border: none;
      padding: 0;
    }
    h1 {
      padding-left: 20px;
      font-size: 24px;
    }
    .el-input {
      width: 350px;
      height: 44px;
      .el-input__inner {
        background: #f4f5fb;
      }
    }
    .el-checkbox {
      color:#606266;
    }
  }
}
</style>
