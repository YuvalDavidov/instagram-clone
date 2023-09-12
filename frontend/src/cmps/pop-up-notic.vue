<template>
  <section
    class="pop-up-notic"
    v-bind:class="{ isClosing: isClosing, isClassOff: isClassOff }"
  >
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
    </article>
    <div class="arrow"></div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      timeoutIdOne: null,
      timeoutIdTwo: null,
      isClassOff: true,
      isClosing: false,
    };
  },
  created() {
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

      this.timeoutIdOne = setTimeout(() => {
        // this.isClosing = true;
        // clearTimeout(this.timeoutIdOne);
      }, 2000);

      this.timeoutIdTwo = setTimeout(() => {
        // this.isClosing = false;
        // this.isClassOff = true;
        // clearTimeout(this.timeoutIdTwo);
      }, 2600);
    },
    restartTimeOut() {
      clearTimeout(this.timeoutIdOne);
      clearTimeout(this.timeoutIdTwo);

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