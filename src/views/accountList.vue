<template>
  <div class="account_list_container">
    <div class="calendar">
      <Calendar
        v-on:choseDay="clickDay"
        v-on:changeMonth="changeMonth"
      ></Calendar>
    </div>

    <!-- if hasData Begin-->
    
      <div class="account_list"  v-if="hasData" >
        <div class="short-item">
          <ShortCount
            :dayPay="dayPay"
            :dayIncome="dayIncome"
            
          />
        </div>
        <!-- <el-skeleton v-if="isLoading" animated/> -->
        <!-- <div class="list" v-else>
          <el-divider content-position="left">{{time}}</el-divider>
        </div> -->
        <div class="loading-container" v-if="isLoading">
          <el-skeleton  animated />
          <el-skeleton  animated />
        </div>
        <div class="wrapper" ref="wrapper" :style="{height:accountListHeight+'px'}">
          <div class="content">
            <billItem
              v-for="item in billList"
              v-bind:key="item._id"
              :type="item.type"
              :desc="item.desc"
              :money="item.money"
              :date="item.date"
              :use="item.use"
            />
          </div>
        </div>
      </div>
      <div class="no-item" v-else>
        <noItem />
      </div>
    
    <!-- if hasData End -->

    
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Calendar from 'vue-calendar-component';
import moment from 'moment';
import noItem from '../components/noItem.vue';
import ShortCount from '../components/ShortCount.vue'
import billItem from '../components/billItem.vue';
import BScroll from '@better-scroll/core';
import axios from 'axios';
export default {
  name: 'accountList',
  data() {
    return {
      hasData: true,
      isLoading: true,
      billList: [],
      accountListHeight: 300,
      width: 100
      // monthPay: 0,
      // monthIncome: 0
      // dayCount: ''
    }
  },
  
  components: {
    Calendar,
    billItem,
    ShortCount,
    noItem
  },
  methods: {
    clickDay(date) {
      this.billList = []
      this.hasData = true
      // date = date.replace(/\//g, '-') //格式化日期，将'/'替换为'-'
      date = moment(date,'YYYY-MM-DD').format('YYYY-MM-DD')
      console.log(date)
      const params = {
        date: date
      }
      axios.get('https://qc76o2.fn.thelarkcloud.com/getAccountList', { params }).then(res => {
        this.isLoading = true
        // console.log(res.data.list);
        const list = res.data.list
        if(list && list.length > 0) {
          // this.billList = list
          setTimeout(() => {
            this.billList = list
            this.isLoading = false
            this.hasData = true
          }, 2000)
        }else {
          this.hasData = false
          this.isLoading = false
        }
      })
    },
    changeMonth(data) {
      console.log(data.split('/')[1]); //左右点击切换月份
    },
  },
  mounted() { //获取今日账单
    const now = new Date()
    const year = now.getFullYear()
    const month = (now.getMonth()+1).toString().padStart(2,0)
    const day = now.getDate()
    const today = year + '-' + month + '-' +day
    const params = {
      date: today
    }
    // console.log(params);
    this.isLoading = true
    axios.get('https://qc76o2.fn.thelarkcloud.com/getAccountList', { params }).then(res => {
      const list = res.data.list
      // console.log(list);
      if(list && list.length > 0) {
        // setTimeout(() => {
          this.billList = list
          this.hasData = true
          this.isLoading = false
          this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.wrapper, {})
          // console.log(this.scroll);
          this.accountListHeight = (document.documentElement.clientHeight - 330)
        })
        // }, 2000)
        
      }else {
        this.hasData = false
        this.isLoading = false
      }
    })
    // console.log(this.accountListHeight);
  },
  computed: {
    dayPay: function() {
      let dayPay = 0
      this.billList.forEach(element => {
        // console.log(element.type);
        if(element.type == '支出') {
          // console.log('money',element.money);
          dayPay += Number(element.money)
          // console.log(dayPay);
        }
      })
      // console.log(dayPay);
      return dayPay
    },
    dayIncome: function() {
      let dayIncome = 0
      this.billList.forEach(element => {
        // console.log(element.type);
        if(element.type == '收入') {
          dayIncome += element.money
        }
      })
      return dayIncome
    }
  }
}
</script>
<style lang="scss">

// 引入日历修改样式
@import '../assets/calendar.scss'; 
.account_list_container {
  height: 100%;
  display: flex;
  flex-direction: column;
  
    .account_list {
      padding: 10px 20px 20px 20px;
      background: #f4f3fc;
      flex: 1;
      .loading-container {
        padding: 10px;
      }
      .wrapper {
        margin-top: 10px;
        height: 200px;
        overflow: hidden;
      }
  
  }
  .no-item {
    display: flex;
    flex: 1;
    background: #f4f3fc;
  }
}


</style>