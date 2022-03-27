<template>
  <!--banner轮播-->
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in list" :key="item.id">
        <img :src="item.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
//引入Swiper
import Swiper from "swiper";

import { mapState } from "vuex";

export default {
  name: "Carsousel",
  props: ["list"],
  mounted() {},
  watch: {
    list: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
           new Swiper(this.$refs.cur,{
              loop: true,
              // 如果需要分页器
              pagination: {
                el: ".swiper-pagination",
                //点击小球的时候也切换图片
                clickable: true,
              },
              // 如果需要前进后退按钮
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
            }
          );
        });
      },
    },
  },
  computed: {
    ...mapState({
      bannerList: (state) => state.home.bannerList,
    }),
  },
};
</script>

<style scoped></style>
