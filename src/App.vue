<template>
  <div id="app">
    <div class="nav">
      <div class="nav-item"><router-link to="/accountList"><i class="iconfont icon-zhangdan"></i><br>账单</router-link></div>
      <div class="nav-item"><router-link to="/addAccount"><i class="iconfont icon-tianjia"></i><br>添加</router-link></div>
      <div class="nav-item"><router-link to="/chart"><i class="iconfont icon-tongji"></i><br>统计</router-link></div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {}
  }
}
</script>

<style lang="scss">
* {
 padding: 0;
 margin: 0;
}
#app, html {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
body {
  height: 100%;
}
.nav {
  width: 100%;
  background-color: #f5f6f7;
  display: flex;
  justify-content: space-evenly;
  padding: 5px 0;
  position: fixed;
  bottom: 0;
  z-index: 999;
  .nav-item {
    height: 50px;
    width: 50px;
    // border-radius: 50%;
    background: transparent;
    .iconfont {
      font-size: 30px;
      color: #3370ff;
    }
  }
}
a {
  text-decoration: none;
  font-size: 10px;
  text-align: center;
}

</style>
