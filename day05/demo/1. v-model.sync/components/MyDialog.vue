<template>
  <div v-if="visible">
    <div class="mask"></div>
    <div class="box">
      对话框
      <button @click="$emit('update:visible', false)">关闭</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped>
.mask {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
}
.box {
  width: 400px;
  height: 300px;
  background-color: #fff;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
