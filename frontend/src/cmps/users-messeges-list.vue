<template>
  <section class="users-messeges-list">
    <li
      v-for="messegesId in messagesIds"
      :key="messegesId"
      class="msg-list"
      :class="isActive(messegesId._id) ? 'active' : ''"
    >
      <div class="user-msg-container" @click="moveToChat(messegesId._id)">
        <img :src="messegesId.imgUrl" style="height: 60px; width: 60px; object-fit: cover;" />
        <div class="msg-info">
          <span>{{ messegesId.username }}</span>
          <!-- <span>{{ messegesId.fullname }}</span> -->
        </div>
      </div>
    </li>
  </section>
</template>

<script>
export default {
  props: {
    messagesIds: {
      type: Array,
      required: false,
    },
  },
  created() {
    console.log('checking the msgs:',  this.messagesIds)
  },
  methods: {
    moveToChat(chatId) {
      if (!this.$route.params._id) {
        this.$router.push(`messages/${chatId}`);
      } else {
        this.$router.replace({ params: { _id: chatId } });
      }
      this.$emit("replace", chatId);
    },
    isActive(id) {
      if (!this.$route.params) return false;
      return this.$route.params._id === id ? true : false;
    },
  },
  // computed: {
  //  ,
  // },
};
</script>

<style>
</style>