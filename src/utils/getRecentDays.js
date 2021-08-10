export function getDays() {
  let days = [];
  const today = new Date();
  for (let i = 0; i <= 144; i += 24) { //144是前六天的小时数
    let dateItem = new Date(today.getTime() - i * 60 * 60 * 1000); //使用当天时间戳减去以前的时间毫秒（小时*分*秒*毫秒）
    // let y = dateItem.getFullYear();	//获取年份
    let m = dateItem.getMonth() + 1; //获取月份js月份从0开始，需要+1
    let d = dateItem.getDate(); //获取日期
    // m = String(m).padStart(2,0);	//给为单数的月份补零

    d = String(d).padStart(2, 0); //给为单数的日期补零
    let valueItem = m + '月' + d + '日'; //组合
    days.push(valueItem); //添加至数组
  }
  // console.log('最近七天日期：', days);
  // ["7月20日", "7月19日", "7月18日", "7月17日", "7月16日", "7月15日", "7月14日"]

  return days;
}

export function getFullDates() {
  let dates = [];
  const today = new Date();
  for (let i = 0; i <= 144; i += 24) { //144是前六天的小时数
    let dateItem = new Date(today.getTime() - i * 60 * 60 * 1000); //使用当天时间戳减去以前的时间毫秒（小时*分*秒*毫秒）
    let y = dateItem.getFullYear();	//获取年份
    let m = dateItem.getMonth() + 1; //获取月份js月份从0开始，需要+1
    let d = dateItem.getDate(); //获取日期
    m = String(m).padStart(2,0);	//给为单数的月份补零

    d = String(d).padStart(2, 0); //给为单数的日期补零
    let valueItem = y + '-' + m + '-' + d; //组合
    dates.push(valueItem); //添加至数组
  }
  // console.log('最近七天日期：', dates);
  // ["2021-07-20", "2021-07-19", "2021-07-18", "2021-07-17", "2021-07-16", "2021-07-15", "2021-07-14"]

  return dates;
}

export function getMonths() {
  let months = []
  const today = new Date();
  for (let i = 0; i >= -6; i -= 1) { //144是前六天的小时数

    let dateItem = today.getMonth() + 1 + i; //使用当天时间戳减去以前的时间毫秒（小时*分*秒*毫秒）
    // let dateItem = 2 + i
    if (dateItem <= 0) dateItem += 12
    console.log(dateItem);
    let m = dateItem; //获取月份js月份从0开始，需要+1
    months.push(m + '月'); //添加至数组
  }
  console.log('最近三个月：', months);

  return months;
}