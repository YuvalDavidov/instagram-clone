<template>
  <section class="user-profile" v-if="user">
    <article class="top">
      <div class="img-container">
        <img :src="`${user.imgUrl}`" />
      </div>
      <div class="right-container">
        <div class="user-details">
          <span>{{ user.username }}</span>
          <button>Edit profile</button>
          <v-icon scale="1.2" name="ri-settings-5-line" />
        </div>
        <div class="user-amount">
          <div><span>0</span> posts</div>
          <div><span>0</span> follower</div>
          <div><span>0</span> following</div>
        </div>
        <div class="user-summery">yuval</div>
      </div>
    </article>

    <section class="actions">
      <button>psots</button>
      <button>saved</button>
      <button>tagged</button>
    </section>

    <section class="posts"></section>
  </section>
</template>

<script>
import { userService } from "../services/user.service";
export default {
  data() {
    return {
      user: null,
      posts: [],
    };
  },
  async created() {
    this.user = await userService.getUserById(this.$route.params._id);
    // this.posts = await
  },
};
</script>

<style>
</style>