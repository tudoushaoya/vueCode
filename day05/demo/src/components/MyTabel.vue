<template>
  <table>
    <tr>
      <th>编号</th>
      <th>任务名</th>
      <th>是否完成</th>
    </tr>
    <tr v-for="item in data" :key="item.id">
      <td>{{ item.id }}</td>
      <td>{{ item.name }}</td>
      <td>
        <slot :row="item"></slot>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped>
table {
  width: 60%;
  margin: 20px auto;
  text-align: center;
}
table,
tr,
td,
th {
  border: 2px solid skyblue;
  border-collapse: collapse;
}
</style>
