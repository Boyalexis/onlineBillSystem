<template>
  <div class="pie-chart-box">
    <div class="pie-chart-tab">
      <div class="minitab" id="pay" :class="[ activeTab == 'pay' ? 'pay' : '']" @click="clickTab($event)">
        月支出
        <p>{{payMoney || 0}}</p>
      </div>
      <div class="minitab" id="income" :class="[ activeTab == 'income' ? 'income' : '']" @click="clickTab($event)">
        月收入
        <p>{{incomeMoney || 0}}</p>
      </div>
    </div>
    <div
    class="pie-chart"
    id="pie_chart_box"
    style="width:100%;height:300px;"
  ></div>
  </div>
</template>
<script>
const echarts = require("echarts");
// import axios from 'axios';
import { getMonthPay,  } from '../utils/getCount';
export default {
  data() {
    return {
      activeTab: 'pay',
      payMoney: 383.24,
      incomeMoney: 100,
      activeMonth: 7,   // 当前选择的月份,
      monthPay: 0,
      monthIncome: 0,
      bill: [],
      payOption: {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '50%',
                data: [
                    {value: 1048, name: '餐饮'},
                    {value: 735, name: '出行'},
                    {value: 146, name: '储值'},
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
      },
      incomeOption: {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: '月收入',
                type: 'pie',
                radius: '50%',
                data: [
                    {value: 18, name: '123'},
                    {value: 75, name: '321'},
                    {value: 146, name: '11'},
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
      }
    }
  },
  components: {},
  methods: {
    clickTab(e) {
      // const month = this.activeMonth
      console.log(e.target.id || e.target.parentElement.id);
      const tabId = e.target.id || e.target.parentElement.id
      if(tabId == 'pay') {
        this.activeTab = 'pay'
        
        var myChart
        myChart = echarts.init(document.getElementById("pie_chart_box"));
        myChart.setOption(this.payOption);
      }else {
        this.activeTab = 'income'
        myChart = echarts.init(document.getElementById("pie_chart_box"));
        myChart.setOption(this.incomeOption);
      }
    }
  },
  mounted() {
    // const myChart = echarts.init(document.getElementById("pie_chart_box"));
    // myChart.setOption(this.payOption);
    const month = (new Date).getMonth() + 1
    console.log(month);
    getMonthPay(month).then(res => {    // getMonthPay返回的是Promise
      // console.log(res);
      // this.bill = res.bill
      this.payOption.series[0].data = res.payArr
      this.incomeOption.series[0].data = res.incomeArr
      this.payMoney = res.monthPay
      this.incomeMoney = res.monthIncome
      const myChart = echarts.init(document.getElementById("pie_chart_box"));
      myChart.setOption(this.payOption);
    });    // 将选择的月份交给getMonthCount处理，返回该月的收支
    // getPieOption(this.bill)
      
  },
}
</script>
<style lang="scss" scoped>
.pie-chart-box {
  .pie-chart-tab {
    display: flex;
    width: fit-content;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    .minitab {
      font-size: 13px;
      margin: 10px;
      border-radius: 10px;
      padding: 10px;
      color: #000;
      background-color: #fff;
      border: 1px solid #eee;
      text-align: center;
      transition: .5s all;
      min-width: 60px;
      width: fit-content;
      // display: flex;
      // flex-direction: column;
    }
    .pay {
      background: #f75676;
      color: #fff;
      box-shadow: 0 20px 50px rgba(247, 86, 118, 0.233);
      border: 1px solid rgba(247, 86, 118, 0.233);
    }
    .income {
      background: #4fd69c;
      color: #fff;
      box-shadow: 0 20px 50px rgba(79, 214, 155, 0.226);
      border: 1px solid rgba(79, 214, 155, 0.226);
    }
  }
  // .pie-chart {

  // }
}
</style>