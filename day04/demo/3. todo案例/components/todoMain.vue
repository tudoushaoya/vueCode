<template>
  <section class="main">
    <ul class="todo-list">
      <li class="todo" v-for="(item, index) in list" :key="item.id">
        <div class="view">
          <span class="index">{{ index + 1 }}</span>
          <label>{{ item.todoName }}</label>
          <button class="destroy" @click="$emit('my-del', item.id)"></button>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    list: {
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

<style scoped></style>
