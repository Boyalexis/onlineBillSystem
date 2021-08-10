<template>
  <div
    class="line-chart"
    id="chart_box"
    style="width:100%;height:500px;"
  ></div>
</template>
<script>
import { getRecentDaysBill } from '../utils/getCount';
const echarts = require("echarts");
import {getDays} from '../utils/getRecentDays';
export default {
  data() {
    return {
      lineoption: {
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["收入", "支出"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        dataZoom: [
          //滑动条
          {
            xAxisIndex: [0], //这里是从X轴的0刻度开始
            show: false, //是否显示滑动条，不影响使用
            type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            startValue: 0, // 从头开始。
            endValue: 3, // 一次性展示6个。
          },
          {
            type: "inside",
            show: true,
            xAxisIndex: [0],
            start: 0, //默认为1
            end: 50,
          },
        ],
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "周一",
            "周二",
            "周三",
            "周四",
            "周五",
            "周六",
            "周日",
          ],
          // axisLabel: {
          //   formatter: function(value) {
          //     x轴的文字改为竖版显示
          //     var str = value.split("");
          //     return str.join("\n");
          //   },
          // },
        },
        yAxis: {
          type: "value",
          // max: 900,
        },
        series: [
          {
            name: "收入",
            type: "line",
            stack: "总量",
            data: [
              120,
              132,
              101,
              134,
              90,
              230,
              210,
            ],
          },
          {
            name: "支出",
            type: "line",
            stack: "总量",
            data: [
              220,
              182,
              191,
              234,
              290,
              330,
              310,
            ],
          },
        ],
      },
    };
  },
  components: {},
  methods: {},
  mounted() {
    let myChart = echarts.init(
      document.getElementById("chart_box")
    );
    const xData = getDays().reverse()
    this.lineoption.xAxis.data = xData
    getRecentDaysBill().then(res => {
      const payMoney = res.payMoney
      const incomeMoney = res.incomeMoney
      this.lineoption.series[1].data = payMoney
      this.lineoption.series[0].data = incomeMoney
      myChart.setOption(this.lineoption);
    })
    
  },
};
</script>
<style lang="scss" scoped>
.line-chart {
  height: 300px;
  width: 100%;
  // margin-top: 20px;
}
</style>
