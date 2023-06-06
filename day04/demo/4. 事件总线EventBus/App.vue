<template>
  <div>
    <my-father></my-father>
    <my-test></my-test>
  </div>
</template>

<script>
import MyFather from '@/components/MyFather.vue'
import MyTest from '@/components/MyTest.vue'
export default {
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
