<template>
  <div>
    <button @click="a">按钮</button>
    <p>{{ a }}</p>
    <p>{{ b }}</p>
    <p>{{ c }}</p>
    <p>{{ d }}</p>
    <p>{{ e }}</p>
  </div>
</template>

<script>
export default {
  props: {
    a: {
      type: Number,
      default: 200,
      // required: true,
    },
    b: {
      type: Array,
      default: () => [1, 2, 3, 45],
    },
    c: {
      type: Object,
      default: () => ({ name: 'zs' }),
    },
    d: {
      type: String,
      validator(value) {
        return ['男', '女'].includes(value)
      },
    },
    e: {
      type: String,
      validator(value) {
        //  邮箱校验
        return /^[\w-]+@[\w-]+\.[a-zA-Z]+$/.test(value)
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    fn() {
      this.a
    },
  },
}
</script>

<style scoped></style>
