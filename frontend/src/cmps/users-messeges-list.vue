<template>
  <section class="users-messeges-list">
    <li
      v-for="(messegesId, index) in messegesIds.chatIds"
      :key="messegesId"
      class="msg-list"
    >
      <div class="user-msg-container" @click="moveToChat(messegesId)">
        <img
          src="http://res.cloudinary.com/dp32ucj0y/image/upload/v1684499340/flz2v8jhwu9z7irwiy06.png"
          alt=""
        />
        <div class="msg-info">
          <span>{{ messegesIds.usersInfo[index].username }}</span>
          <!-- <span>{{ messegesIds.usersInfo[index].username }}</span> -->
        </div>
      </div>
    </li>
  </section>
</template>

<script>
export default {
  created() {
    console.log(this.messegesIds);
  },
  props: {
    messegesIds: {
      type: Object,
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