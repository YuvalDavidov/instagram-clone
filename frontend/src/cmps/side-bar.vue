<template>
  <section class="side-bar-container" v-if="!isInStory">
    <section
      class="side-bar"
      v-if="!this.isMobileMode"
      v-bind:class="{
        isSearchOpen: this.isSearchOpen,
        isTabletMode: this.isTabletMode,
      }"
    >
      <div class="logo">
        <RouterLink to="/">
          <img
            v-if="!isSearchOpen && !isTabletMode"
            class="logo-img"
            src="../assets/imgs/instagram_logo.png"
          />
          <img
            v-if="isSearchOpen || isTabletMode"
            class="logo-line-img"
            src="../assets/imgs/instagram_logo_line.png"
          />
        </RouterLink>
      </div>
      <nav>
        <RouterLink active-class="active" to="/"
          ><v-icon scale="1.6" name="fa-home" /><span
            v-if="!isSearchOpen && !isTabletMode"
            >Home</span
          ></RouterLink
        >
        <button @click="onToggleSearch()" class="side-bar-btn">
          <v-icon scale="1.6" name="bi-search" /><span
            v-if="!isSearchOpen && !isTabletMode"
            >Search</span
          >
        </button>

        <RouterLink active-class="active" to="/messages">
          <v-icon scale="1.6" name="la-facebook-messenger" /><span
            v-if="!isSearchOpen && !isTabletMode"
            >Messages</span
          ></RouterLink
        >

        <RouterLink to="/notifications">
          <v-icon name="fa-regular-heart" color="black" scale="1.6" />
          <span v-if="!isSearchOpen && !isTabletMode">Notifications</span>
        </RouterLink>

        <button @click="onToggleCreate()" class="side-bar-btn">
          <v-icon scale="1.6" name="bi-plus-square" />
          <span v-if="!isSearchOpen && !isTabletMode">create</span>
        </button>

        <RouterLink
          class="profile-btn"
          active-class="active"
          :to="`/profile/${user._id}`"
        >
          <img :src="`${user.imgUrl}`" class="profile-img" /><span
            v-if="!isSearchOpen && !isTabletMode"
          >
            Profile</span
          ></RouterLink
        >
      </nav>
      <button
        @click="onToggleSettings()"
        class="settings-btn"
        v-bind:class="{ isSettingsModalOpen }"
      >
        <v-icon scale="1.6" name="co-hamburger-menu" />
        <span v-if="!isSearchOpen && !isTabletMode">More</span>
      </button>
    </section>

    <section class="mobile-bar" v-if="this.isMobileMode">
      <section class="top-bar">
        <div class="logo">
          <RouterLink to="/">
            <img class="logo-img" src="../assets/imgs/instagram_logo.png" />
          </RouterLink>
        </div>
        <div class="search-bar-n-notification-mobile">
          <input
            type="text"
            v-model="this.searchTxt"
            @input="onSearch"
            @click="onOpenMobileSearch()"
            placeholder="Search"
            class="search-input mobile"
          />
          <button
            v-if="this.searchTxt.length"
            @click="onClearSearch()"
            class="clear-search-input-btn mobile"
          >
            x
          </button>
          <RouterLink to="/notifications">
            <v-icon name="fa-regular-heart" color="black" scale="1.5" />
          </RouterLink>
        </div>
      </section>
      <section class="bottom-bar">
        <nav>
          <RouterLink class="nav-btn" to="/"
            ><v-icon color="black" scale="1.5" name="fa-home"
          /></RouterLink>
          <RouterLink class="nav-btn" to="/messages">
            <v-icon color="black" scale="1.5" name="la-facebook-messenger"
          /></RouterLink>

          <button @click="onToggleCreate()" class="side-bar-btn">
            <v-icon scale="1.5" name="bi-plus-square" />
          </button>

          <RouterLink class="nav-btn" :to="`/profile/${user._id}`">
            <img :src="`${user.imgUrl}`" class="profile-img"
          /></RouterLink>
        </nav>
      </section>
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
        <a @click="onLogout()"><span>Log out</span></a>
      </section>
    </article>

    <article class="search-bar" v-if="isSearchOpen">
      <section class="top">
        <h1>Search</h1>
        <input
          @input="onSearch"
          class="search-input"
          type="text"
          placeholder="Search"
          v-model="this.searchTxt"
        />
        <button
          v-if="this.searchTxt.length"
          @click="onClearSearch()"
          class="clear-search-input-btn"
        >
          x
        </button>
      </section>
      <UsersList @onToggleSearch="onToggleSearch" />
    </article>

    <article v-if="isCreateOpen" class="create-post-modal">
      <section class="container" @click="onToggleCreate()"></section>
      <CreateModal @onToggleCreate="onToggleCreate" />
    </article>

    <article v-if="isMobileSearchOpen" class="search-mobile">
      <div class="container" @click="onCloseMobileSearch()"></div>

      <SearchMobileBar @onCloseMobileSearch="onCloseMobileSearch" />
    </article>
  </section>
</template>

<script>
import { userService } from "../services/user.service";

import CreateModal from "@/cmps/create-modal.vue";
import UsersList from "@/cmps/users-list.vue";
import SearchMobileBar from "@/cmps/search-mobile-bar.vue";

export default {
  data() {
    return {
      isSettingsModalOpen: false,
      isSearchOpen: false,
      isMobileSearchOpen: false,
      isCreateOpen: false,
      searchTxt: "",
      usersBySearch: [],
      isTabletMode: false,
      isMobileMode: false,
    };
  },
  created() {
    if (window.innerWidth < 1260 && window.innerWidth > 770) {
      this.isTabletMode = true;
      this.isMobileMode = false;
    } else if (window.innerWidth < 770) {
      this.isMobileMode = true;
      this.isTabletMode = false;
    } else {
      this.isMobileMode = false;
      this.isTabletMode = false;
    }
    window.addEventListener("resize", this.windowSizeHandeler);
  },
  destroyed() {
    window.removeEventListener("resize", this.windowSizeHandeler);
  },
  methods: {
    onToggleSettings() {
      this.isSettingsModalOpen = !this.isSettingsModalOpen;
    },
    onToggleSearch() {
      this.isSearchOpen = !this.isSearchOpen;
    },
    onOpenMobileSearch() {
      this.isMobileSearchOpen = true;
    },
    onCloseMobileSearch() {
      this.isMobileSearchOpen = false;
    },
    onClearSearch() {
      this.searchTxt = "";
      this.onSearch();
    },
    onSearch() {
      console.log("hi");
      this.$store.dispatch({
        type: "loadUsersBy",
        filterBy: this.searchTxt,
      });
    },
    onLogout() {
      userService.logout();
    },
    onToggleCreate() {
      this.isCreateOpen = !this.isCreateOpen;
    },
    windowSizeHandeler(e) {
      if (
        e.currentTarget.innerWidth < 1260 &&
        e.currentTarget.innerWidth > 770
      ) {
        if (this.isMobileSearchOpen) this.isMobileSearchOpen = false;
        this.isTabletMode = true;
        this.isMobileMode = false;
      } else if (e.currentTarget.innerWidth < 770) {
        if (this.isSearchOpen) this.isSearchOpen = false;
        this.isMobileMode = true;
        this.isTabletMode = false;
      } else {
        this.isMobileMode = false;
        this.isTabletMode = false;
      }
    },
  },
  computed: {
    user() {
      return this.$store.getters.GetUser;
    },
    isInStory() {
      if (this.$route.path.includes("/stories")) return true;
      else false;
    },
  },
  components: {
    CreateModal,
    UsersList,
    SearchMobileBar,
  },
};
</script>
