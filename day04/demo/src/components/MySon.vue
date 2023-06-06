<template>
  <div>孙组件--{{ msg }}</div>
</template>

<script>
export default {
  inject: {
    msg: {
      type: String,
    },
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped></style>
