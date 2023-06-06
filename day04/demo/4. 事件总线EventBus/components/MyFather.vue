<template>
  <div>
    子组件
    <my-son></my-son>
  </div>
</template>

<script>
import MySon from "./MySon.vue";
export default {
  components: {
    MySon,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped></style>
