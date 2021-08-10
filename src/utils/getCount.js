import axios from 'axios';
import {  getFullDates } from './getRecentDays';

export async function getMonthPay(month) {
  const params = {
    month: month
  }
  var monthPay = 0
  var monthIncome = 0
  var bill
  var payData = []
  var incomeData = []
  await axios.get('https://qc76o2.fn.thelarkcloud.com/getMonthBill', { params }).then(res => {
    bill = res.data
    bill.forEach(e => {
      // console.log(e);
      if(e.type == '支出'){
        monthPay += e.money
        payData.push({
          value: e.money,
          name: e.use
        })
      }else if(e.type == '收入'){
        monthIncome += e.money
        incomeData.push({
          value: e.money,
          name: e.use
        })
      }
    })
    // console.log(monthPay,monthIncome);
  }).catch(err => {
    console.log(err);
  })
  // console.log(payData);
  const payObj = {}
  const payArr = []
  const incomeObj = {}
  const incomeArr = []
  payData.map(item => {
    if(payObj[item.name]){
      payArr.map(node=>{
          if(item.name==node.name){
              node.value += item.value
          }
      })
  }else{
    payObj[item.name]=1
      payArr.push(item)
  }
  })  // 分类
  incomeData.map(item => {
    if(incomeObj[item.name]){
      incomeArr.map(node => {
        node.value += item.value
      })
    }else {
      incomeObj[item.name] = 1
      incomeArr.push(item)
    }
  })
  // console.log(incomeArr, incomeObj);
  return {
    payArr,
    incomeArr,
    monthPay,
    monthIncome
  }
}

export async function getRecentDaysBill() {
  // console.log(getFullDates());
  const params = getFullDates()
  
  let payArr = []
  var incomeArr = []
  var payData = []
  var incomeData = []
  var bills
  var payMoney = []
  var incomeMoney = []
  // var incomeData = []
  await axios.get('https://qc76o2.fn.thelarkcloud.com/getDaysBill', {params}).then(res => {
    bills = res.data
    // console.log(params.reverse());
    bills.forEach(e => {
      if(e.type == '支出') {
        // console.log(e.money);
        payArr.push({
          value: e.money,
          date: e.date
        })
        // console.log('payArr in forEach', payArr);
      }else {
        incomeArr.push({
          value: e.money,
          date: e.date
        })
      }
    })
    // console.log(arr);
    const days = params.reverse()
    // console.log(days.indexOf("2021-07-14"));

    const payDays = {}
    for(let i = 0;i<days.length;i++) {
      payData.push({
        value: 0,
        date: days[i]
      })
      payDays[days[i]] = 1
    }
    
    payData.map(item => {
      for(let k=0;k<payArr.length;k++){
        if(item.date == payArr[k].date) {
          // console.log(item.date,'==',incomeArr[k].date);
          item.value += payArr[k].value
        }
      }
    })

    const incomeDays = {}
    // let j = 0
    for(let j = 0;j<days.length;j++) {
      incomeData.push({
        value: 0,
        date: days[j]
      })
      incomeDays[days[j]] = 1
    }
    
    incomeData.map(item => {
      for(let k=0;k<incomeArr.length;k++){
        if(item.date == incomeArr[k].date) {
          // console.log(item.date,'==',incomeArr[k].date);
          item.value += incomeArr[k].value
        }
      }
    })
    

    // const payMoney = []
    payData.forEach(e => {
      payMoney.push(e.value)
    })
    // const incomeMoney = []
    incomeData.forEach(e => {
      incomeMoney.push(e.value)
    })
    // console.log('payData',payData,'payDays',payDays)
    // console.log('incomeData',incomeData,'incomeDays',incomeDays)
    // console.log('payMoney', payMoney);
    // console.log('incomeMoney', incomeMoney);
    // console.log(payArr,incomeArr);
  })
  return {
    payMoney,
    incomeMoney
  }
}
// payData有瑕疵

// 柱状图数据
export async function getYearBill() {
  var payBill = []
  var incomeBill = []
  await axios.get('https://qc76o2.fn.thelarkcloud.com/getYearBill').then(res => {
    // console.log(res.data);
    const arr = Object.values(res.data)
    // console.log(arr);
    arr.forEach(item => {
      // console.log('item', item);
      payBill.push(item.pay)
      incomeBill.push(item.income)
    })
  })
  // console.log(payBill, incomeBill);
  return {
    payBill,
    incomeBill
  }
}


