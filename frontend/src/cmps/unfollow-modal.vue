<template>
  <section v-if="user" class="unfollow-modal">
    <div class="unfollow-userInfo">
      <img :src="user.imgUrl" alt="" />
      <span>Unfollow @{{ user.username }}?</span>
    </div>
    <button @click="onUnfollow" style="color: red; font-weight: bold">
      Unfollow
    </button>
    <button @click="onClose">Cancel</button>
  </section>
</template>

<script>
import { followService } from "../services/follow.service";
import { userService } from "../services/user.service";
export default {
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      user: null,
    };
  },
  async created() {
    this.user = await userService.getUserById(this.userId);
    console.log(this.user);
  },
  methods: {
    async onUnfollow() {
      await followService.unFollow(this.user._id);
      this.onClose();
    },
    onClose() {
      this.$emit("onClose");
    },
  },
};
</script>

<style>
</style>