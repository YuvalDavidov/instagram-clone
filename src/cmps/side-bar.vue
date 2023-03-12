<template>
  <section class="side-bar">
    <RouterLink to="/">
      <img class="logo-img" src="../assets/imgs/instagram_logo.png"
    /></RouterLink>

    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/search">Search</RouterLink>
      <RouterLink to="/messages">Messages</RouterLink>
    </nav>
    <button class="settings-btn">more</button>
  </section>
</template>

<script>
export default {};
</script>
