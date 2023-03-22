<template>
    <article class="post-details-home">
        <div class="post-details-header">
            <img class="user-img" :src="post.userImg">
            <span>{{ post.username }}</span>
            </div>
        <img class="post-img" :src="post.imgsUrl[0]" >
    </article>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    }
}
</script>

<style>

</style>