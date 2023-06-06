<template>
  <div>
    <MyTest @my-click="fn($event)"></MyTest>
    <MyTest @my-click="fn"></MyTest>
  </div>
</template>

<script>
import MyTest from './components/MyTest.vue'
export default {
  components: {
    MyTest,
  },
  data() {
    return {
      a: 1,
    }
  },
  methods: {
    fn(value) {
      console.log(value)
    },
  },
}
</script>

<style scoped></style>
