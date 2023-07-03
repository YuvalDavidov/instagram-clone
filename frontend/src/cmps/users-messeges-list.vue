<template>
  <section class="users-messeges-list">
    <li v-for="messegesId in messegesIds" :key="messegesId" class="msg-list">
      <div @click="moveToChat(messegesId)">{{ messegesId }}</div>
    </li>
  </section>
</template>

<script>
export default {
  props: {
    messegesIds: {
      type: Array,
      required: false,
    },
  },
  methods: {
    moveToChat(chatId) {
      if (!this.$route.params._id) {
        this.$router.push(`${chatId}`);
      } else {
        this.$router.replace({ params: { _id: chatId } });
      }
      this.$emit("replace", chatId);
    },
  },
};
</script>

<style>
</style>