<template>
  <section class="create-chat-modal">
    <section class="bg-container" @click="onCloseModal"></section>
    <section class="create-chat">
      <div class="top">
        <div></div>
        <span>New messege</span>
        <button @click="onCloseModal"><v-icon name="bi-x" scale="2" /></button>
      </div>
      <article class="search-users">
        <div class="search-input-create">
          <span>To:</span>
          <input
            type="text"
            v-model="this.searchTxt"
            placeholder="Search..."
            class="search-input-msg"
            @input="serachUsers"
          />
        </div>
        <section class="users">
          <li v-for="(user, index) in filterdByUsers" :key="index">
            <div class="list-container" @click="moveTo(user)">
              <img class="user-img" :src="user.imgUrl" alt="" />
              <div class="user-info">
                <span>{{ user.username }}</span>
                <span>{{ user.fullname }}</span>
              </div>
            </div>
          </li>
        </section>
      </article>
      <button
        @click="onCreateNewChat"
        class="create-chat-btn"
        :class="usersToChat.length ? '' : 'isDisaabled'"
      >
        Chat
      </button>
    </section>
  </section>
</template>

<script>
import { chatService } from "../services/chat.service";

export default {
  data() {
    return {
      searchTxt: "",
      usersToChat: ["1"],
    };
  },
  methods: {
    serachUsers() {
      console.log(this.searchTxt);
      this.$store.dispatch({
        type: "loadUsersBy",
        filterBy: this.searchTxt,
      });
    },
    onCloseModal() {
      this.$emit("onToggleCreateNewChat");
    },
    async onCreateNewChat() {
      if (!this.usersToChat.length) return;
      else {
        try {
          const topic = await chatService.createNewChat(this.usersToChat);
          if (!this.$route.params._id) {
            this.$router.push(`messages/${topic}`);
          } else {
            this.$router.replace({ params: { _id: topic } });
          }
          this.$emit("replaceTopic", topic);
          this.$emit("onToggleCreateNewChat");
        } catch (error) {
          new Error("coudl'nt create this chat", error);
        }
      }
    },
  },
  computed: {
    filterdByUsers() {
      return this.$store.getters.filterdByUsers;
    },
  },
};
</script>

<style>
</style>