<template>
  <div class="account_list_container">
    <div class="calendar">
      <Calendar
        v-on:choseDay="clickDay"
        v-on:changeMonth="changeMonth"
      ></Calendar>
    </div>

    <!-- if hasData Begin-->
      <div class="short-item">
        <ShortCount
          :dayPay="dayPay"
          :dayIncome="dayIncome"
          
        />
      </div>
      <div class="account_list"  v-if="hasData" >
        
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
              @clickBill="handleClick(item._id)"
            />
          </div>
        </div>
      </div>
      <div class="no-item" v-else>
        <noItem />
      </div>
    
    <!-- if hasData End -->
  <el-drawer
    title='这瓜保熟吗？'
    :visible.sync="drawer"
    direction="btt"
    custom-class="demo-drawer"
    ref="drawer"
    :show-close="showClose"
  >
    <div class="demo-drawer__content">
    <div class="demo-drawer__footer">
        <el-button class="button-group" icon="el-icon-edit" type="success" @click="handleEdit">编辑</el-button>
        <el-button class="button-group" icon="el-icon-delete" type="danger" @click="handleDelete">删除</el-button>
        <el-button class="button-group" type="primary" @click="handleCancel">取消</el-button>
      </div>
    </div>
  </el-drawer>
    
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
import { MessageBox } from 'element-ui';
export default {
  name: 'accountList',
  data() {
    return {
      hasData: true,
      isLoading: true,
      billList: [],
      accountListHeight: 300,
      width: 100,
      // monthPay: 0,
      // monthIncome: 0
      // dayCount: '',
      drawer: false,
      showClose: false,
      activeBillId:''
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
      // console.log(date)
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
          }, 500)
        }else {
          this.hasData = false
          this.isLoading = false
        }
      })
    },
    changeMonth(data) {
      console.log(data.split('/')[1]); //左右点击切换月份
    },
    handleClick(billId) {
      // console.log(billId)
      this.activeBillId = billId
      this.drawer = true
    },
    handleEdit() {
      // console.log(this.activeBillId,'账单需要编辑')
      this.$router.push(`/addAccount/`+this.activeBillId)
    },
    handleDelete() {
      // console.log(this.activeBillId,'账单需要删除')
      MessageBox.confirm('确定删除该账单吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const params = {
            id: this.activeBillId
          }
          axios.post('https://qc76o2.fn.thelarkcloud.com/deleteAccountItemById',params).then((res) => {
            console.log(res)
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.drawer = false
            window.location.reload()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
          this.drawer = false          
        });
    },
    handleCancel() {
      this.activeBillId = ''
      this.drawer = false
    }
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
      padding: 0px 20px 20px 20px;
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
.button-group {
  display: block;
  width: 80%;
  margin: 2px auto!important;
}

</style>