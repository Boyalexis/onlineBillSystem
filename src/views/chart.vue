<template>
  <div class="chart">
    <div class="tab-wrapper">
      <Tab/>
    </div>
    <div class="description">
      <p>tips：左右滑动切换tab，手指缩放控制图表显示范围</p>
    </div>
    <div class="tab_page-wrapper">
      <tabPage />
    </div>
  </div>
</template>
<script>
import Tab from '../components/tab.vue';
import tabPage from '../components/tabPage.vue';
export default {
  name: 'chart',
  data() {
    return {}
  },
  components: {
    Tab,
    tabPage
  },
  methods: {
    // tab(index) {
    //   console.log('tab to chart',index);
    // },
    // slideTab(index) {
    //   console.log('swiper to chart',index);
    // }
  }
}
</script>
<style lang="scss" scoped>
.chart {
  display: flex;
  flex-direction: column;
  height: 100%;
  .description {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #fda623;
  }
  .tab-wrapper {
    
  }
  .tab_page-wrapper {
    flex: 1;
  }
}
</style>