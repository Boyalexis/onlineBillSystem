<template>
  <div class="nav-container">
    <ul class="tab">
      <li class="tab_item" v-for="(item, index) in tabList" :key="index" @click="tabClick(index)" :class="{ active:nowIndex === index }">
        {{item}}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nowIndex: 0,
      tabList: [
        '折线图',
        '柱状图',
        '饼状图'
      ]
    }
  },
  components: {},
  mounted() {
    this.$root.eventHub.$on('slideTab', this.slideTab)  // 接收tabPage改变的事件
  },
  methods: {
    tabClick(index) {
      // console.log(index);
      this.nowIndex = index
      this.$root.eventHub.$emit('changeTab', index)
    },
    slideTab(index) {
      // console.log('swiper to tab',index);
      this.nowIndex = index
    }
  }
}
</script>
<style lang="scss" scoped>
.tab {
  display: flex;
  justify-content: space-around;
  justify-items: center;
  align-items: center;
  height: 40px;
  width: 100%;
  background: #f5f6f7;
  .tab_item {
    display: flex;
    justify-content: center;
    align-items: center;
    // width: 100px;
    flex: 1;
    height: 100%;
    background: #f5f6f7;
    text-align: center;
    font-size: 12px;
    color: grey;
    &.active {
      background: #fff;
      color: #65a192;
    }
  }
}
</style>