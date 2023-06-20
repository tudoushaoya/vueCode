<template>
  <div>
    <div class="app">
      <div class="demo"></div>
    </div>
    <div class="test"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang='scss'>
$c: red;
.app {
  .demo {
    width: 200px;
    height: 200px;
    background-color: $c;
    &:hover {
      background-color: blue;
    }
  }
}

@mixin circle($d, $c) {
  width: $d;
  height: $d;
  border-radius: 50%;
  background-color: $c;
}
.test {
  @include circle(100px, red);
}
</style>
