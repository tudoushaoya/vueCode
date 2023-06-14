<template>
 <div>
  <van-nav-bar
  title="注册"
/>

<van-form @submit="onSubmit">
      <!-- 输入框组件 -->
      <!-- \w 字母数字_   \d 数字0-9 -->
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[
          { required: true, message: '请填写用户名' },
          { pattern: /^\w{5,}$/, message: '用户名至少包含5个字符' }
        ]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[
          { required: true, message: '请填写密码' },
          { pattern: /^\w{6,}$/, message: '密码至少包含6个字符' }
        ]"
      />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>

   <div class="link">
    <router-link class="link" to="/login">如有帐号,去登录</router-link>
   </div>
 </div>
</template>

<script>
import { userRegister } from '@/api/user'
export default {
  name: 'login-page',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async  onSubmit (values) {
      // console.log('submit', values)
      const res = await userRegister(values)
      console.log(res)
      this.$toast.success('注册成功')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang='less'>
.link{
  float: right;
  margin-right: 10px;
}
</style>
