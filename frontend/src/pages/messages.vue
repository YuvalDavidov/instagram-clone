<template>
  <section class="messages-container">
    <section class="messages">
      <article class="messages-users">
        <div class="top">
          <div class="user-name">{{ user.username }}</div>
          <button><v-icon name="ri-edit-box-line" /></button>
        </div>

        <UsersMessegesList :messegesIds="userMessages" @replace="replace" />
      </article>

      <article class="messages-chat">
        <section class="msgs"></section>
        <form class="input-form" @submit="sendMes" v-if="showChat">
          <textarea
            type="text"
            placeholder="Messege..."
            v-model="this.msg.txt"
            data-gramm="false"
          ></textarea>
          <button class="send-btn">send</button>
        </form>
      </article>
    </section>
  </section>
</template>

<script>
import UsersMessegesList from "../cmps/users-messeges-list.vue";
import {
  socketService,
  SOCKET_EMIT_TOPIC,
  SOCKET_EMIT_NEW_MSG,
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
      userMessages: ["123", "456"],
      mesgs: [
        { _id: "1", txt: "sd", timestemp: "12:00" },
        { _id: "1", txt: "sddd", timestemp: "12:00" },
        { _id: "2", txt: "sss", timestemp: "12:00" },
      ],
    };
  },
  created() {
    this.msg.userId = this.user._id;
    console.log(this.user);
    if (this.$route.params._id) {
      socketService.emit(SOCKET_EMIT_TOPIC, this.$route.params._id);
    }
  },
  methods: {
    sendMes() {
      console.log(this.msg);
      socketService.emit(SOCKET_EMIT_NEW_MSG, this.msg);
      this.msg.txt = "";
    },
    replace() {
      socketService.emit(SOCKET_EMIT_TOPIC, this.$route.params._id);
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