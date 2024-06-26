<template>
  <section class="messages-container">
    <section class="messages">
      <article class="messages-users">
        <div class="top">
          <div class="user-name">{{ user.username }}</div>
          <button @click="onToggleCreateNewChat">
            <v-icon name="ri-edit-box-line" />
          </button>
        </div>

        <UsersMessegesList :messagesIds="getChatsIds" @replace="replaceTopic" />
      </article>

      <article class="messages-chat">
        <section class="msgs-container">
          <li
            class="msgs"
            :class="msg.userId === user._id ? 'user-msg' : ''"
            v-for="(msg, idx) in messeges"
            :key="msg._id"
          >
            <div
              class="msgs-time"
              :class="
                msg.userId === user._id ? 'user-msg-time' : 'guest-msg-time'
              "
            >
              {{ showTime(idx) }}
            </div>
            <div
              class="msg"
              :class="[
                msg.userId === user._id ? 'user-msg' : 'guest-msg',
                timeClass(idx) ? 'time-on' : '',
              ]"
            >
              {{ msg.txt }}
            </div>
          </li>
        </section>
        <span v-if="typingUsers.length" class="typing"
          >{{ typingUsers[0] }} Typing...</span
        >
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
        <section class="no-chat" v-if="!showChat">
          <div class="cercul">
            <v-icon scale="3" name="la-facebook-messenger" />
          </div>
          <h3>Your messages</h3>
          <small>Send private photos and messages to a friend or group</small>
          <button @click="onToggleCreateNewChat">Send message</button>
        </section>
      </article>
    </section>
    <CreateChatModal
      v-if="isCreateNewChatOpen"
      @onToggleCreateNewChat="onToggleCreateNewChat"
      @replaceTopic="replaceTopic"
    />
  </section>
</template>

<script>
import CreateChatModal from "../cmps/create-chat-modal.vue";
import UsersMessegesList from "../cmps/users-messeges-list.vue";
import { chatService } from "../services/chat.service";
import {
  socketService,
  SOCKET_EMIT_TOPIC,
  SOCKET_EMIT_NEW_MSG,
  SOCKET_EMIT_TYPING,
  SOCKET_EMIT_STOP_TYPING,
  SOCKET_EVENT_TYPING,
  SOCKET_EVENT_STOP_TYPING,
  SOCKET_EVENT_ADD_MSG,
  SOCKET_EVENT_TOPIC,
} from "../services/socket.service";

export default {
  components: { UsersMessegesList, CreateChatModal },
  data() {
    return {
      user: null,
      msg: {
        txt: "",
        timestemp: null,
        userId: null,
      },
      messeges: [],
      timeoutId: null,
      typingUsers: [],
      isCreateNewChatOpen: false,
      msgTimestampes: [],
    };
  },
  async created() {
    this.user = this.$store.getters.GetUser;
    this.msg.userId = this.user._id;

    await this.$store.dispatch({
      type: "loadChatIds",
    });

    if (this.$route.params._id) {
      socketService.emit(SOCKET_EMIT_TOPIC, this.$route.params._id);
    }
  },
  mounted() {
    socketService.on(SOCKET_EVENT_TOPIC, this.setChatHistory);
    socketService.on(SOCKET_EVENT_ADD_MSG, this.addMsg);
    socketService.on(SOCKET_EVENT_TYPING, this.addTypingUsers);
    socketService.on(SOCKET_EVENT_STOP_TYPING, this.removeTypingUser);
  },
  beforeUnmount() {
    socketService.off(SOCKET_EVENT_ADD_MSG, this.addMsg);
    socketService.off(SOCKET_EVENT_TYPING, this.addTypingUsers);
    socketService.off(SOCKET_EVENT_STOP_TYPING, this.removeTypingUser);
    socketService.off(SOCKET_EVENT_TOPIC, this.setChatHistory);
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
      clearTimeout(this.timeoutId);

      this.timeoutId = setTimeout(() => {
        socketService.emit(SOCKET_EMIT_STOP_TYPING, this.user);
        this.timeoutId = null;
      }, 2000);
    },
    addTypingUsers(user) {
      this.typingUsers.push(user.username);
    },
    removeTypingUser(user) {
      this.typingUsers.splice(user.username);
    },
    addMsg(msg) {
      this.messeges.unshift(msg);
    },
    setChatHistory(msgs) {
      this.messeges = msgs;
      this.msgTimestampes = this.messeges.map((m) => m.timestemp);
      this.calculateTimeDiff();
    },
    onToggleCreateNewChat() {
      this.isCreateNewChatOpen = !this.isCreateNewChatOpen;
    },
    calculateTimeDiff() {
      chatService.showTime(this.msgTimestampes);
    },
    showTime(idx) {
      return chatService.getTime(idx, this.msgTimestampes);
    },
    timeClass(idx) {
      return chatService.getClass(idx);
    },
  },
  computed: {
    showChat() {
      if (this.$route.params._id) return true;
      else return false;
    },
    getChatsIds() {
      return this.$store.getters.getChatsIds
    },
  },
  watch: {
    "$route.params": { // Handle changes in case params is changing but the component doesnt rerender (in case of transfer from one profile to another)
      immediate: true,
      async handler(params) {
        await this.$store.dispatch({
        type: "loadChatIds",
      });
      },
    },
  },
};
</script>

<style>
</style>