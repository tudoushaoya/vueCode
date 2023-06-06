<template>
  <div>
    <button @click="a = 2">按钮</button>
    <MyTest :a="a" :c="{ name: 'zs' }" d="男" e="123@ssss.com"></MyTest>
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
  methods: {},
}
</script>

<style scoped></style>
