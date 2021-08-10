<template>
  <div class="Calendar">
    <Calendar
      v-on:choseDay="clickDay"
    ></Calendar>
  </div>
</template>
<script>
import Calendar from 'vue-calendar-component';
export default {
  name: "Calendar",
  data() {
    return {}
  },
  components: {
    Calendar
  },
  methods: {
    clickDay(data) {
      console.log(data); //选中某天
    }
  }
}
</script>
<style lang="scss" scoped>

  .wh_content_all[data-v-2ebcbc83] {
    height: 340px!important;
  }

</style>