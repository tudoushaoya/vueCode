<template>
  <div class="box" v-loading="show">
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
    this.show = false
  },
  data() {
    return {
      list: [],
      show: true,
    }
  },
  methods: {},
}
</script>

<style>
.box {
  width: 500px;
  height: 400px;
  position: relative;
  border: 1px solid blue;
}
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.lds-dual-ring:after {
  content: ' ';
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fed;
  border-color: #fed transparent #fed transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
