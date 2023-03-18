<template>
  <section class="side-bar-container full">
    <section class="side-bar" v-bind:class="{ isSearchOpen }">
      <div class="logo">
        <RouterLink to="/">
          <img
            v-if="!isSearchOpen"
            class="logo-img"
            src="../assets/imgs/instagram_logo.png"
          />
          <img
            v-if="isSearchOpen"
            class="logo-line-img"
            src="../assets/imgs/instagram_logo_line.png"
          />
        </RouterLink>
      </div>

      <nav>
        <RouterLink active-class="active" to="/"
          ><v-icon scale="1.6" name="fa-home" /><span v-if="!isSearchOpen"
            >Home</span
          ></RouterLink
        >
        <button @click="onToggleSearch()" class="search-btn">
          <v-icon scale="1.6" name="bi-search" /><span v-if="!isSearchOpen"
            >Search</span
          >
        </button>
        <RouterLink active-class="active" to="/messages">
          <v-icon scale="1.6" name="la-facebook-messenger" /><span
            v-if="!isSearchOpen"
            >Messages</span
          ></RouterLink
        >
        <RouterLink
          class="profile-btn"
          active-class="active"
          to="/user-profile"
        >
          <img src="../assets/imgs/dummy-user.jpg" class="profile-img" /><span
            v-if="!isSearchOpen"
          >
            Profile</span
          ></RouterLink
        >
      </nav>
      <button
        @click="onToggleModal()"
        class="settings-btn"
        v-bind:class="{ isSettingsModalOpen }"
      >
        <v-icon scale="1.6" name="co-hamburger-menu" />
        <span v-if="!isSearchOpen">More</span>
      </button>
    </section>

    <article v-if="isSettingsModalOpen" class="settings-modal">
      <section class="genetal-settings">
        <a href=""
          ><span>Settings</span>
          <v-icon scale="1.2" name="ri-settings-5-line" />
        </a>
        <a href=""
          ><span>Your activity</span
          ><v-icon scale="1.2" name="bi-clock-history"
        /></a>
        <a href=""
          ><span>Saved</span><v-icon scale="1.2" name="la-bookmark-solid"
        /></a>
        <a href=""
          ><span>Switch appearance</span><v-icon scale="1.2" name="bi-moon"
        /></a>
        <a href=""
          ><span>Report a problem</span><v-icon scale="1.2" name="oi-report"
        /></a>
      </section>
      <section class="account-settings">
        <a href=""><span>Switch account</span></a>
        <a href=""><span>Log out</span></a>
      </section>
    </article>

    <article class="search-bar" v-if="isSearchOpen">
      <section class="top">
        <h1>Search</h1>
        <input type="text" placeholder="Search" v-model="this.searchTxt" />
        <button class="clear-search-input-btn">x</button>
      </section>
    </article>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isSettingsModalOpen: false,
      isSearchOpen: false,
      searchTxt: "",
      usersBySearch: [],
    };
  },
  methods: {
    onToggleModal() {
      this.isSettingsModalOpen = !this.isSettingsModalOpen;
    },
    onToggleSearch() {
      this.isSearchOpen = !this.isSearchOpen;
    },
  },
};
</script>
