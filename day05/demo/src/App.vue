<template>
  <div>
    <ul>
      <li v-for="item in list" :key="item.id">
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  async created() {
    const res = await axios('http://hmajax.itheima.net/api/news')
    this.list = res.data.data
  },
  data() {
    return {
      list: [],
    }
  },
  methods: {},
}
</script>

<style scoped></style>
