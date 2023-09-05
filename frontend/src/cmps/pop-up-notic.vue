<template>
  <section class="pop-up-notic" :class="isClassOf ? 'off' : ''">
    <div class="container-pop-up">
      {{ txt }}
    </div>
    <div class="arrow"></div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      txt: "s",
      interval: null,
      isClassOf: false,
    };
  },
  created() {
    console.log("created", this.notifications);
    this.startTimeOut();
  },
  props: {
    notifications: {
      type: Array,
      required: true,
    },
  },
  methods: {
    startTimeOut() {
      console.log("start");
      this.interval = setTimeout(() => {
        this.isClassOf = true;
        clearTimeout(this.interval);
      }, 2000);
    },
    restartTimeOut() {
      console.log("restart", this.notifications);
      clearTimeout(this.interval);
      this.startTimeOut();
    },
  },
  watch: {
    notifications: {
      handler(newValue) {
        this.restartTimeOut();
      },
      deep: true,
    },
  },
};
</script>

<style>
</style>