<template>
  <section class="messages-container">
    <section class="messages">
      <article class="messages-users">
        <div class="top">
          <div class="user-name">{{ user.username }}</div>
          <button><v-icon name="ri-edit-box-line" /></button>
        </div>

        <UsersMessegesList :messegesIds="messegesIds" @replace="replaceTopic" />
      </article>

      <article class="messages-chat">
        <section class="msgs" v-for="mes in messeges" :key="mes._id">
          <div>{{ mes }}</div>
        </section>
        <span v-if="typingUsers.length">{{ typingUsers[0] }} Typing...</span>
        <form class="input-form" @submit="sendMsg" v-if="showChat">
          <textarea
            type="text"
            placeholder="Messege..."
            v-model="this.msg.txt"
            data-gramm="false"
            @input="onTyping"
          ></textarea>
          <button class="send-btn">send</button>
        </form>
      </article>
    </section>
  </section>
</template>

<script>
import { ref, watch } from "vue";
import UsersMessegesList from "../cmps/users-messeges-list.vue";
import {
  socketService,
  SOCKET_EMIT_TOPIC,
  SOCKET_EMIT_NEW_MSG,
  SOCKET_EMIT_TYPING,
  SOCKET_EMIT_STOP_TYPING,
  SOCKET_EVENT_TYPING,
  SOCKET_EVENT_STOP_TYPING,
  SOCKET_EVENT_ADD_MSG,
} from "../services/socket.service";

export default {
  components: { UsersMessegesList },
  data() {
    return {
      user: this.$store.getters.GetUser,
      msg: {
        txt: "",
        timestemp: null,
        userId: null,
      },
      messegesIds: ["123", "456"],
      messeges: [],
      timeoutId: null,
      typingUsers: [],
    };
  },
  created() {
    // this.timeoutId = ref(null);
    this.msg.userId = this.user._id;
    if (this.$route.params._id) {
      socketService.emit(SOCKET_EMIT_TOPIC, this.$route.params._id);
    }
  },
  mounted() {
    console.log("mount");
    socketService.on(SOCKET_EVENT_ADD_MSG, this.addMsg);
    socketService.on(SOCKET_EVENT_TYPING, this.addTypingUsers);
    socketService.on(SOCKET_EVENT_STOP_TYPING, this.removeTypingUser);
  },
  beforeUnmount() {
    console.log("unmount");
    socketService.off(SOCKET_EVENT_ADD_MSG, this.addMsg);
    socketService.off(SOCKET_EVENT_TYPING, this.addTypingUsers);
    socketService.off(SOCKET_EVENT_STOP_TYPING, this.removeTypingUser);
  },
  methods: {
    sendMsg() {
      this.msg.timestemp = new Date().getTime();
      socketService.emit(SOCKET_EMIT_NEW_MSG, this.msg);
      this.msg.txt = "";
    },
    replaceTopic(chatId) {
      socketService.emit(SOCKET_EMIT_TOPIC, chatId);
    },
    onTyping() {
      if (!this.timeoutId) {
        socketService.emit(SOCKET_EMIT_TYPING, this.user);
      }
      clearInterval(this.timeoutId);

      this.timeoutId = setTimeout(() => {
        socketService.emit(SOCKET_EMIT_STOP_TYPING, this.user);
      }, 2000);
    },
    addTypingUsers(user) {
      this.typingUsers.push(user.username);
    },
    removeTypingUser(user) {
      this.typingUsers.splice(user.username);
    },
    addMsg(msg) {
      this.messeges.push(msg);
    },
  },
  computed: {
    showChat() {
      if (this.$route.params._id) return true;
      else return false;
    },
  },
};
</script>

<style>
</style>