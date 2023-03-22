<template>
  <section>

    <section class="post-preview-home" v-for="post in posts" :key="post.id">
    <post-preview-home :post="post" />
    <div class="post-actions">
        <nav class="actions-nav"></nav>
        <span>{{ post.likes.length }} likes</span>
        <div>
            <span class="username">{{ post.username }}</span>
            <span class="summery">{{ post.summery }}</span>
        </div>    
        <button @click="openPostModal()" v-if="post.comments.length">View all {{ post.comments.length }} comments</button>
        <span>{{ hoursAgo(new Date(post.timeStamp)) }} </span>
    </div>
</section>

  </section>
</template>

<script>
import postPreviewHome from './post-preview-home.vue'
export default {
  components: { postPreviewHome },
    props: {
        posts: {
            type: Array,
            required: true
        }
    },
   
    methods: {
    hoursAgo(timestamp) {
  const now = new Date();
  const diffMs = now - timestamp;
  const diffHrs = diffMs / (1000 * 60 * 60);
  const diffHrsRounded = Math.round(diffHrs);
  return diffHrsRounded + " HOURS AGO";
}
    }
}
</script>

<style>

</style>