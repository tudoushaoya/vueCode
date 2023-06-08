<template>
  <div>
    <input type="text" :value="msg" @input="msg = $event.target.value" />
    <p>{{ msg }}</p>
    <hr />
    <InputNumber :value="num" @input="num = $event"></InputNumber>
    <InputNumber v-model="num"></InputNumber>
    <button @click="visible = true">确定</button>
    <MyDialog :visible.sync="visible"></MyDialog>
  </div>
</template>

<script>
import InputNumber from '@/components/InputNumber.vue'
import MyDialog from './components/MyDialog.vue'
export default {
  components: {
    InputNumber,
    MyDialog,
  },
  data() {
    return {
      msg: 'hello',
      num: 1,
      visible: false,
    }
  },
  methods: {},
}
</script>

<style scoped></style>
