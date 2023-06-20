<template>
  <div>

    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>数据看板</el-breadcrumb-item>
</el-breadcrumb>
<div class="box" id="main"></div>
<TablePage>
  <template #default="s">
    123{{ s.list.name }}
  </template>
</TablePage>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'dashboard-page',
  mounted () {
    const myChart = echarts.init(document.getElementById('main'))
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
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang='scss'>
.box {
  width: 600px;
  height: 400px;
}
</style>
