<template>
  <section>
    <section class="post-preview-home" v-for="post in posts" :key="post.id">
      <post-preview-home :post="post" />
      <div class="post-actions">
        <nav class="actions-nav">
          <button class="action-icon">
            <v-icon scale="1.4" name="fa-regular-heart" />
          </button>
          <button class="action-icon">
            <v-icon scale="1.4" name="fa-regular-comment" flip="horizontal" />
          </button>
        </nav>
        <span>{{ post.likes.length }} likes</span>
        <div>
          <span class="username">{{ post.username }}</span>
          <span class="summery">{{ post.summery }}</span>
        </div>
        <button @click="openPostModal()" v-if="post.comments.length">
          View all {{ post.comments.length }} comments
        </button>
        <span>{{ timeAgo() }} </span>
      </div>
    </section>
  </section>
</template>

<script>
import { postService } from "../services/post.service";
import postPreviewHome from "./post-preview-home.vue";
export default {
  components: { postPreviewHome },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },

  methods: {
    timeAgo(timestamp) {
      return postService.getTime(timestamp);
    },
  },
};
</script>

<style>
</style>