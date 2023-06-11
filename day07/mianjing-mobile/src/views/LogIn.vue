<template>
  <div>
    <van-nav-bar title="面经登录" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' },{pattern: /\w{5,}/, message: '长度必须是5个字符以上'}]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' },{pattern: /\w{6,}/, message: '长度必须是6个字符以上'}]"
      />
      <div style="margin: 16px">
        <van-button  block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
      <div class="link">
        <router-link to="/signup">没账号？去注册</router-link>
      </div>
    </van-form>
  </div>
</template>

<script>
import { userLogin } from '@/api/user'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async onSubmit (values) {
      const res = await userLogin(values)
      console.log(res)
      this.$toast.success('登录成功')
    }
  }
}
</script>

<style scoped lang='less'>
.link {
  text-align: left;
  margin: 16px;
}
</style>
