<template>
  <div class="no-item">
    <i class="iconfont icon-web__zanwujilu"></i>
    <p>暂无数据</p>
  </div>
</template>
<script>
export default {
  name: "noItem",
  data() {
    return {}
  },
  components: {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.no-item {
  // display: flex;
  flex-direction: column;
  // padding: 50px;
  justify-content: center;
  align-items: center;
  .iconfont {
    font-size: 100px;
    margin: 0 auto;
  }
  p {
    font-size: 15px;
    color: #5e6d82;
  }
}
</style>