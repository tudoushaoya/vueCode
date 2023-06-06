<template>
  <header class="header">
    <h1>小黑记事本</h1>
    <input
      placeholder="请输入任务"
      class="new-todo"
      v-model.trim="name"
      @keyup.enter="add"
    />
    <button class="add" @click="add">添加任务</button>
  </header>
</template>

<script>
export default {
  data() {
    return {
      name: '',
    }
  },
  methods: {
    add() {
      if (this.name === '') {
        return alert('任务不能为空')
      }
      this.$emit('my-add', this.name)
      this.name = ''
    },
  },
}
</script>

<style scoped></style>
