<template>
  <section class="pop-up-notic" :class="isClassOff ? 'off' : ''">
    <article class="container-pop-up">
      <div
        class="follow-liks-comments-notic"
        v-if="
          notifications.followersNotifics.length ||
          notifications.likesNotofics.length
        "
      >
        <div
          class="new-followers"
          v-if="notifications.followersNotifics.length"
        >
          <v-icon name="io-person" scale="0.7" />
          <span> {{ notifications.followersNotifics.length }} </span>
        </div>
        <div class="new-like" v-if="notifications.likesNotofics.length">
          <v-icon name="io-person" scale="0.7" />
          <span> {{ notifications.likesNotofics.length }} </span>
        </div>
      </div>
      <div v-if="notifications.msgsNotifics.length" class="msg-notic"></div>
    </article>
    <div class="arrow"></div>
    <div>x</div>
  </section>
</template>

<script>
import { followService } from "../services/follow.service";
export default {
  data() {
    return {
      txt: "s",
      interval: null,
      isClassOff: false,
    };
  },
  created() {
    // console.log("created", this.notifications);
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
      this.isClassOff = false;
      this.interval = setTimeout(() => {
        this.isClassOff = true;
        clearTimeout(this.interval);
      }, 2000);
    },
    restartTimeOut() {
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