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

      <article class="-chat">s</article>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: this.$store.getters.GetUser,
    };
  },
  created() {
    console.log(this.user);
  },
};
</script>

<style>
</style>