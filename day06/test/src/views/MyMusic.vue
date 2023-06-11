<template>
  <div>我的音乐<button @click="$router.go(-1)">返回</button><button @click="$router.back()">再次返回</button></div>
</template>

<script>
export default {
  created () {
    console.log(this.$route.query)
    console.log(this.$route.query.a)
    console.log(this.$route.query.b)
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang='less'></style>
