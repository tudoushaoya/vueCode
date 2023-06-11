<template>
  <div>
    <div style="height: 1000px"></div>
    <img v-lazy="src" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: 'https://a.appsimg.com/upload/brand/upcb/2023/05/17/123/ias_1684322109228951029.jpg!75.webp',
    }
  },
  methods: {},
}
</script>

<style scoped></style>
