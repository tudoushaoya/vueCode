<template>
  <div class="box">
    <span @click="$emit('input',value-1)">-</span>
    <input type="text" :value="value"/>
    <span @click="$emit('input',value+1)">+</span>
  </div>
</template>

<script>

export default {
  props: {
    value: {
      type: Number,
      required: true
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.box {
  border: 1px solid #f5f7fa;
}
.box span,
.box input {
  float: left;
  outline: none;
}
.box span {
  width: 40px;
  height: 38px;
  background-color: #f5f7fa;
  text-align: center;
  line-height: 38px;
  font-size: 18px;
}
.box span:first-child {
  border-right: 1px solid #f5f7fa;
}
.box span:last-child {
  border-right: 1px solid #f5f7fa;
}
.box input {
  width: 180px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border: none;
}
</style>
