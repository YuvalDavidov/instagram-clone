<template>
  
</template>

<script>
export default {
    data() {
        return { }
    },
    async created() {

    },
    computed: {
        posts() {
            return this.$store.getters.posts
        }
    }
}
</script>
