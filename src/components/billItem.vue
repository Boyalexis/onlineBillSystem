<template>
  <div class="bill-item" @click="clickBill">
    <div class="type-desc">
      <div class="type">{{use}}</div>
      <div class="desc">{{desc}}</div>
    </div>
    <div class="money-date">
      <div class="money">
        <h1 :class="[type=='支出' ? 'pay' : 'income']">{{type=='支出' ? '-' : '+'}}{{money}}</h1>
      </div>
      <div class="date">{{date}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'billItem',
  props: [
    'type',
    'desc',
    'date',
    'money',
    'use'
  ],
  data() {
    return {
      // pay: this.type=='支出' ? true :false  //类型值给data保存
    }
  },
  components: {},
  methods: {
    clickBill() {
      this.$emit('clickBill')
    }
  },
  // watch: {
  //   pay(newValue) {
  //     if(newValue == 'pay'){
  //       this.pay = true
  //     }else{
  //       this.pay = false
  //     }
  //   }
  // }
}
</script>
<style lang="scss" scoped>
.bill-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  padding: 10px 15px;
  background-color: #fff;
  border-radius: 7px;
  .type-desc {
    .type {
      background: #5e72e4;
      color: #fff;
      border-radius: 4px;
      font-size: 11px;
      padding: 2px 5px;
      width: fit-content;
      margin-top: 2px;
    }
    .desc {
      font-size: 14px;
      margin: 7px 0 0;
    }
  }
  .money-date {
    display: flex;
    // align-items: center;
    flex-direction: column;
    .money {
      font-size: 10px;
      text-align: right;
      .pay {
        color: red;
      }
      .income {
        color: green;
      }
    }
    .date {
      color: #ccc;
      font-size: 12px;
      text-align: right;
      min-width: 70px;
    }
  }
}

</style>