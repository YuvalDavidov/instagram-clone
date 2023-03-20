<template>
  <section class="post-list-profile">
    <li v-for="post in posts" :key="post._id" class="post-grid">
      <img :src="post.imgsUrl[0]" />
    </li>
  </section>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
</style>