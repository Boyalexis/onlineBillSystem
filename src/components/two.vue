<template>
  <div
    class="bar-chart"
    id="line_chart_box"
    style="width:100%;height:500px;"
  ></div>
</template>
<script>
const echarts = require("echarts");
import {getYearBill} from '../utils/getCount'; 
export default {
  data() {
    return {
      barOption: {
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
        },
        dataZoom: [
          //滑动条
          {
            xAxisIndex: [0], //这里是从X轴的0刻度开始
            show: false, //是否显示滑动条，不影响使用
            type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            startValue: 0, // 从头开始。
            endValue: 2, // 一次性展示6个。
          },
          {
            type: "inside",
            show: true,
            xAxisIndex: [0],
            start: 0, //默认为1
            end: 3,
          },
        ],
        legend: {
          data: ["收入", "支出"],
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
            // max: 170,
          },
        ],
        series: [
          {
            name: "收入",
            type: "bar",
            color: '#42b884',
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4,
              3.3,
            ],
          },
          {
            name: "支出",
            type: "bar",
            color: '#fc5531',
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0,
              2.3,
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
      document.getElementById(
        "line_chart_box"
      )
    );
    
    // console.log(getRecentMonthBill());
    getYearBill().then(res => {
      this.barOption.series[1].data = res.payBill
      this.barOption.series[0].data = res.incomeBill
      myChart.setOption(this.barOption);
    })
  },
};
</script>
<style lang="scss" scoped>
.bar-chart {
  margin-top: 20px;
}
</style>
