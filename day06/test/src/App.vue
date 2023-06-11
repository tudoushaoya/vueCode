<template>
  <div>
    <router-link to="/find">find</router-link><br>
    <router-link :to="{name:'find'}">find</router-link><br>
    <router-link to="/my?a=1&b=3">my</router-link>
    <router-link to="/article/1">文章1</router-link>
    <router-link to="/article/2">文章2</router-link>
    <router-link to="/article/3">文章3</router-link>
    <router-link to="/sc">四川</router-link>
    <router-link to="/sc/cd">成都</router-link>
    <button @click="fn">我的</button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    fn () {
      this.$router.push('/my')
    }
  }
}
</script>

<style scoped lang='less'>
// .router-link-active {
//   color: red;
//   font-size: 30px;
// }
.router-link-exact-active {
  color: red;
  font-size: 30px;
}
</style>
