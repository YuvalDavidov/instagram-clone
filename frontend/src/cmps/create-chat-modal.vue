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
          <div v-if="this.namesToShow.length" class="selected-users-container">
            <li
              v-for="selectedUser in namesToShow"
              :key="selectedUser"
              class="chosen-user"
            >
              {{ selectedUser }}
              <button @click="removeUserFromChat(selectedUser)">
                <v-icon name="bi-x" scale="1" />
              </button>
            </li>
          </div>
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
            <div class="list-container">
              <img class="user-img" :src="user.imgUrl" alt="" />
              <div class="user-info">
                <span>{{ user.fullname }}</span>
                <span>{{ user.username }}</span>
              </div>
              <input
                :checked="isSelected(user._id)"
                type="checkbox"
                @click="toggleUserToChat(user)"
              />
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
      usersToChat: [],
      namesToShow: [],
    };
  },
  methods: {
    serachUsers() {
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
    toggleUserToChat(user) {
      const userId = user._id;
      const username = user.username;
      if (!this.usersToChat.includes(userId)) {
        this.usersToChat.push(userId);
        this.namesToShow.push(username);
        this.searchTxt = "";
        this.$store.dispatch({
          type: "loadUsersBy",
          filterBy: this.searchTxt,
        });
      } else {
        const idx = this.usersToChat.indexOf(userId);
        this.usersToChat = this.usersToChat.filter(
          (user, indx) => indx !== idx
        );
        this.namesToShow = this.namesToShow.filter(
          (user, indx) => indx !== idx
        );
      }
    },
    isSelected(userId) {
      if (this.usersToChat.includes(userId)) return true;
      else return false;
    },
    removeUserFromChat(username) {
      const idx = this.namesToShow.indexOf(username);
      this.usersToChat = this.usersToChat.filter((user, indx) => indx !== idx);
      this.namesToShow = this.namesToShow.filter((user, indx) => indx !== idx);
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