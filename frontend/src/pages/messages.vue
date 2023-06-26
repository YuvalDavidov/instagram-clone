<template>
  <section class="messages-container">
    <section class="messages">
      <article class="messages-users">
        <div class="top">
          <div class="user-name">{{ user.username }}</div>
          <button><v-icon name="ri-edit-box-line" /></button>
        </div>

        <div class="users">ss</div>
      </article>

      <article class="-chat">
        <form @submit="sendMes">
          <input type="text" v-model="this.msg.txt" />
          <button>send</button>
        </form>
      </article>
    </section>
  </section>
</template>

<script>
import {
  socketService,
  SOCKET_EMIT_TOPIC,
  SOCKET_EMIT_NEW_MSG,
} from "../services/socket.service";

export default {
  data() {
    return {
      user: this.$store.getters.GetUser,
      msg: {
        txt: "",
        timestemp: null,
        userId: null,
      },
    };
  },
  created() {
    this.msg.userId = this.user._id;
    console.log(this.user);
    socketService.emit(SOCKET_EMIT_TOPIC, "111");
  },
  methods: {
    sendMes() {
      console.log(this.msg);
      socketService.emit(SOCKET_EMIT_NEW_MSG, this.msg);
    },
  },
};
</script>

<style>
</style>