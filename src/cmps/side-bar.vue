<template>
  <section class="side-bar">
    <div class="logo">
      <RouterLink to="/">
        <img class="logo-img" src="../assets/imgs/instagram_logo.png"
      /></RouterLink>
    </div>

    <nav>
      <RouterLink active-class="active" to="/"
        ><v-icon name="fa-home" /><span>Home</span></RouterLink
      >
      <RouterLink active-class="active" to="/search">
        <v-icon name="bi-search" /><span>Search</span></RouterLink
      >
      <RouterLink active-class="active" to="/messages">
        <v-icon name="la-facebook-messenger" /><span>Messages</span></RouterLink
      >
    </nav>
    <button
      @click="onToggleModal()"
      class="settings-btn"
      v-bind:class="{ isOpen }"
    >
      <v-icon name="co-hamburger-menu" /> <span>More</span>
    </button>
  </section>

  <article v-if="isOpen" class="settings-modal">
    <section class="genetal-settings">
      <a href=""><span>Settings</span> <v-icon name="ri-settings-5-line" /> </a>
      <a href=""
        ><span>Your activity</span><v-icon name="bi-clock-history"
      /></a>
      <a href=""><span>Saved</span><v-icon name="la-bookmark-solid" /></a>
      <a href=""><span>Switch appearance</span><v-icon name="bi-moon" /></a>
      <a href=""><span>Report a problem</span><v-icon name="oi-report" /></a>
    </section>
    <section class="account-settings">
      <a href=""><span>Switch account</span></a>
      <a href=""><span>Log out</span></a>
    </section>
  </article>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    onToggleModal() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
