<template>
  <div>
    <my-father></my-father>
  </div>
</template>

<script>
import MyFather from '@/components/MyFather.vue'
export default {
  components: { MyFather },
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
