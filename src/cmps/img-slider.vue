<template>
  <swiper
    :pagination="{
      type: 'progressbar',
    }"
    :navigation="true"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide v-for="(imgUrl, index) in imgsUrl" :key="index">
      <img :src="imgUrl" />
    </swiper-slide>
  </swiper>
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";

import "../../node_modules/swiper/swiper.scss";

import "../../node_modules/swiper/modules/pagination/pagination.scss";
import "../../node_modules/swiper/modules/navigation/navigation.scss";

import { Pagination, Navigation } from "swiper";

export default {
  props: {
    imgsUrl: {
      type: Array,
      required: true,
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination, Navigation],
    };
  },
};
</script>
