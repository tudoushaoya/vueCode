<template>
  <div>
    <!-- <MyTest>男</MyTest>
    <MyTest>女</MyTest>
    <MyTest></MyTest> -->
    <MyTest>
      <template v-slot:left>123</template>
      <template v-slot:right>321</template>
      <template v-slot:default>999</template>
    </MyTest>
    <MyTest>
      <template #left>123</template>
      <template #right>321</template>
      <template #default>999</template>
    </MyTest>
    <MyTest>
      <template #left>123</template>
      <template #right>321</template>
      <template>999</template>
    </MyTest>
  </div>
</template>

<script>
import MyTest from './components/MyTest.vue'
export default {
  components: {
    MyTest,
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped></style>
