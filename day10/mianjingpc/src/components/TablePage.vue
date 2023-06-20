<template>
  <table>
    <thead>
      <tr>
        <th>编号</th>
        <th>姓名</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for='item in list' :key='item.id'>
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <slot :list="item"></slot>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data () {
    return {
      list: [
        { id: 1, name: '张三' },
        { id: 2, name: '李四' },
        { id: 3, name: '王五' }
      ]
    }
  },
  methods: {}
}
</script>

<style scoped lang='scss'></style>
