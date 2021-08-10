<template>
  <!-- swiper滑动 -->
  <div class="swiper-box">
    <div class="swiper-container" id="swiper1">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in list" :key="index">
          <keep-alive>
            <component :is="item.component"></component>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import lineChart from '../components/lineChart.vue';
import two from '../components/two.vue';
import three from '../components/three.vue';
import Swiper from 'swiper'
import 'swiper/swiper.scss';

export default {
  components: {
    lineChart,
    two,
    three
  },
  data() {
    return {
      list: [
        {path: '/one', component: lineChart},
        {path: '/two', component: two},
        {path: '/three', component: three}
      ],
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination'
        },
        // Some Swiper option/callback...
      }
    }
  },
  mounted() {
    var mySwiper = new Swiper('.swiper-container', {
      // 设置初始化时slide的索引，根据当前路由设置
      initialSlide: this.$route.path === '/one' ? 0 : this.$route.path === '/two' ? 1 : this.$route.path === '/three' ? 2 : this.$route.path === '/four' ? 3 : 0
    });
    mySwiper.on('slideChange', () => { // 监控滑动后当前页面的索引，将索引发射到导航组件
      // 左右滑动时将当前slide的索引发送到tab组件
      this.$root.eventHub.$emit('slideTab', mySwiper.activeIndex);
    });
    // 接收tab组件传过来的导航按钮索引值，跳转到相应内容区
    this.$root.eventHub.$on('changeTab', (index) => { // 点击导航键跳转相应内容区
      console.log('tab to swiper',index);
      mySwiper.slideTo(index, 0, false);
    });
    // console.log(mySwiper);
  }
}
</script>

<style lang="scss" scoped>
.swiper-box {
  height: 100%;
  .swiper-container {
    height: 100%;
    .swiper-wrapper {
      height: 100%;
      .swiper-slide {
        // height: 100%;
      }
    }
  }
}
</style>
