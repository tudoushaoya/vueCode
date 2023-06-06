<template>
  <!-- 主体区域 -->
  <section id="app">
    <!-- 输入框 -->
    <TodoHeader @my-add="add"></TodoHeader>

    <!-- 列表区域 -->
    <TodoMain :list="list" @my-del="del"></TodoMain>

    <!-- 统计和清空 -->
    <TodoFooter :list="list" @my-del-all="delAll"></TodoFooter>
  </section>
</template>

<script>
import TodoHeader from '@/components/todoHeader'
import TodoMain from '@/components/todoMain'
import TodoFooter from '@/components/todoFooter'
export default {
  components: {
    TodoHeader,
    TodoMain,
    TodoFooter,
  },
  data() {
    return {
      list: JSON.parse(localStorage.getItem('list')) || [],
    }
  },
  methods: {
    del(id) {
      this.list = this.list.filter((item) => item.id !== id)
    },
    add(name) {
      this.list.unshift({
        id: this.list.length + 1,
        todoName: name,
        isDone: false,
      })
    },
    delAll() {
      this.list = []
    },
  },
  watch: {
    list: {
      handler() {
        localStorage.setItem('list', JSON.stringify(this.list))
      },
      deep: true,
    },
  },
}
</script>

<style></style>
