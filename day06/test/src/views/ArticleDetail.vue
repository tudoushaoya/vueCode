<template>
  <div>文章详情</div>
</template>

<script>
export default {
  created () {
    console.log(this.$route.params.id)
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang='less'></style>
