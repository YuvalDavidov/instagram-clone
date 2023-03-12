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
    <button class="settings-btn">
      <v-icon name="co-hamburger-menu" /> <span>More</span>
    </button>
  </section>
</template>

<script>
export default {};
</script>
