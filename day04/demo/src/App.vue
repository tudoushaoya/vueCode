<template>
  <div>
    <my-father></my-father>
    <my-test ref="mytest"></my-test>
    <p class="test" ref="test"></p>
  </div>
</template>

<script>
import MyFather from '@/components/MyFather.vue'
import MyTest from '@/components/MyTest.vue'
export default {
  mounted() {
    // ref只会在当前的页面中去查找，避免了全局污染，且更高级的是，ref可以获取到组件的实例
    console.log(this.$refs.test)
    console.log(this.$refs.mytest.fn)
  },
  components: { MyFather, MyTest },
  provide() {
    return {
      msg: '我是孙组件',
    }
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped></style>
