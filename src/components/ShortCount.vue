<template>
  <div class="short-count">
    <div class="thisMonth">
      <span>本月</span
      ><span class="pay">支出{{ monthPay }}元</span>
      <span class="income"
        >收入{{ monthIncome }}元</span
      >
    </div>
    <div class="thisDay">
      <span>这天</span
      ><span class="pay">支出{{ dayPay }}元</span>
      <span class="income"
        >收入{{ dayIncome }}元</span
      >
    </div>
  </div>
</template>
<script>
import {getMonthPay} from '../utils/getCount';
export default {
  data() {
    return {
      time: '123',
      pay: '382.24',
      income: '100',
      monthPay: 0,
      monthIncome: 0
    };
  },
  props: [
    'dayPay',
    'dayIncome',
    // 'monthPay',
    // 'monthIncome'
  ],
  components: {},
  methods: {},
  mounted() {
    const month = (new Date).getMonth()+1
    getMonthPay(month).then(res => {
      this.monthPay = res.monthPay
      this.monthIncome = res.monthIncome
    })
  }
};
</script>
<style lang="scss" scoped>
.short-count {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-family: monospace;
  .thisMonth {
    display: flex;
    justify-content: flex-end;
  }
  .thisDay {
    display: flex;
    justify-content: flex-end;
  }
  .pay {
    color: red;
    margin: 0 6px;
  }
  .income {
    color: green;
    margin: 0 6px;
  }
}
</style>
