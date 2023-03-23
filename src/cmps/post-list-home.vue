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
        <button @click="openPostModal()" v-if="post.comments.length">View all {{ post.comments.length }} comments</button>
        <span>{{ timeAgo(new Date(post.timeStamp)) }} </span>
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
timeAgo(timestamp) {
const now = new Date();
const diffMs = now - timestamp;
const diffHrs = diffMs / (1000 * 60 * 60);
if (diffHrs < 23) {
  const diffHrsRounded = Math.round(diffHrs);
  return diffHrsRounded + " hour" + (diffHrsRounded !== 1 ? "s" : "") + " ago";
} else {
  let diffDays = Math.floor(diffHrs / 24);
  if (!diffDays) diffDays = 1
  return diffDays + " day" + (diffDays !== 1 ? "s" : "") + " ago";
}
    }
}
}
</script>

<style>

</style>