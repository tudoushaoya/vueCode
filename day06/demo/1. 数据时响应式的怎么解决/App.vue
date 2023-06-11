<template>
  <div>
    <button @click="fn">按钮</button>
    <p></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: ['pink', 'red', 'blue', 'green', 'yellow', 'orange', 'purple'],
      obj: {
        name: 'John',
        age: 30,
        city: 'New York',
      },
    }
  },
  methods: {},
}
</script>

<style scoped></style>
