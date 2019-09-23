<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      legendData: [],
      seriesMsg: [],
      colorData: ['#FF005A', '#3888fa', '#f3f8ff']
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions(val = {}) {
      var seriesData = val.series
      for (var i = 0; i < seriesData.length; i++) {
        this.legendData.push(seriesData[i].name)
        var msg = {
          name: seriesData[i].name,
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: this.colorData[i],
              lineStyle: {
                color: this.colorData[i],
                width: 2
              },
              areaStyle: {
                color: this.colorData[i]
              }
            }
          },
          data: seriesData[i].data,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }
        this.seriesMsg[i] = msg
      }
      this.chart.setOption({
        xAxis: {
          data: val.date,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: this.legendData
        },
        series: this.seriesMsg
      })
    }
  }
}
</script>
