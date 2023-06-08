<template>
  <div>
    <MyTest>
      <template #default="scope">
        {{ scope.flag }}
      </template>
    </MyTest>
    <MyTest>
      <template #default="scope">
        {{ scope.flag ? '正确' : '错误' }}
      </template>
    </MyTest>

    <MyTest>
      <template #default="scope">
        <button style="color: green" v-if="scope.flag === true">正确</button>
        <button style="color: red" v-else>错误</button>
      </template>
    </MyTest>
    <hr />
    <hr />
    <hr />
    <MyTabel :data="list">
      <template #default="scope">
        <span style="color: green" v-if="scope.row.done === true"> 完成 </span>
        <span style="color: red" v-else>未完成</span>
      </template>
    </MyTabel>
  </div>
</template>

<script>
import MyTest from '@/components/MyTest.vue'
import MyTabel from '@/components/MyTabel.vue'
export default {
  components: {
    MyTest,
    MyTabel,
  },
  data() {
    return {
      list: [
        { id: 1, name: '吃饭', done: true },
        { id: 2, name: '睡觉', done: false },
        { id: 3, name: '打豆豆', done: true },
      ],
    }
  },
  methods: {},
}
</script>

<style scoped></style>
