<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <count-to :start-val="0" :end-val="2000000" :duration="8000" />
    <div>
      {{ $store.getters.company }}---{{ $store.getters.departmentName }}
    </div>
    <div class="main" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CountTo from 'vue-count-to'
import * as echarts from 'echarts'
export default {
  name: 'Dashboard',
  components: {
    CountTo
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    var myChart = echarts.init(document.querySelector('.main'))
    // 绘制图表
    myChart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    })
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.main {
  width: 600px;
  height: 400px;
  background-color: #ccc;
  margin: 0 auto;
}
</style>
