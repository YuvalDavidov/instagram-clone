<template>
  <section
    class="side-bar-container"
    v-bind:class="{ darkMode: darkMode }"
    v-if="!isInStory"
  >
    <div
      class="close-bg"
      v-if="isWantToCreate || isSettingsModalOpen"
      @click="isWantToCreate ? wantToCreate() : onToggleSettings()"
    ></div>
    <section
      class="side-bar"
      v-if="!this.isMobileMode"
      v-bind:class="{
        isSearchOpen: this.isSearchOpen,
        isTabletMode: this.isTabletMode,
        isWantToCreate: this.isWantToCreate,
      }"
    >
      <div class="logo">
        <RouterLink to="/">
          <img
            v-if="!isSearchOpen && !isTabletMode"
            class="logo-img"
            :src="logoSrc"
          />
          <img
            v-if="isSearchOpen || isTabletMode"
            class="logo-line-img"
            :src="logoTabletSrc"
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
          <v-icon
            name="fa-regular-heart"
            :color="darkMode ? 'white' : 'black'"
            scale="1.6"
          />
          <span v-if="!isSearchOpen && !isTabletMode">Notifications</span>
        </RouterLink>

        <button
          v-if="!isWantToCreate"
          @click="wantToCreate()"
          class="side-bar-btn"
        >
          <v-icon scale="1.6" name="bi-plus-square" />
          <span v-if="!isSearchOpen && !isTabletMode">create</span>
        </button>

        <div v-if="isWantToCreate" class="side-bar-btn create">
          <span @click="onToggleCreate()" class="create-post-btn" v-if="isPost"
            >post</span
          >
          <span
            @click="onToggleCreate()"
            v-if="!isPost"
            class="create-story-btn"
            >story</span
          >
          <button @click="changePostingSelection">
            <v-icon v-if="isPost" name="md-keyboardarrowdown-round" />
            <v-icon v-if="!isPost" name="md-keyboardarrowup-round" />
          </button>
        </div>

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
            <img class="logo-img" :src="logoSrc" />
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

          <button @click="wantToCreate()" class="side-bar-btn">
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
        <a href="/" @click="onLogout()"><span>Log out</span></a>
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
      <div class="close-bg" @click="onToggleSearch()"></div>
    </article>

    <article v-if="isCreateOpen" class="create-post-modal">
      <section class="bg-container" @click="onToggleCreate()"></section>
      <CreateModal @onToggleCreate="onToggleCreate" :isPost="isPost" />
    </article>

    <article v-if="isMobileSearchOpen" class="search-mobile">
      <div class="container" @click="onCloseMobileSearch()"></div>

      <SearchMobileBar @onCloseMobileSearch="onCloseMobileSearch" />
    </article>

    <article class="want-to-create-modal" v-if="isMoblieWantToCreate">
      <button @click="onToggleCreate()" v-if="isPost">post</button>
      <button @click="onToggleCreate()" v-if="!isPost">story</button>

      <button @click="changePostingSelection">
        <v-icon v-if="isPost" name="md-keyboardarrowdown-round" />
        <v-icon v-if="!isPost" name="md-keyboardarrowup-round" />
      </button>
    </article>
  </section>
</template>

<script>
import { userService } from "../services/user.service";

import CreateModal from "@/cmps/create-modal.vue";
import UsersList from "@/cmps/users-list.vue";
import SearchMobileBar from "@/cmps/search-mobile-bar.vue";

import instagramLogo from "../assets/imgs/instagram_logo.png";
import instagramLogoWhite from "../assets/imgs/instagram_logo_white.png";
import instagramLogoLine from "../assets/imgs/instagram_logo_line.png";
import instagramLogoLineWhite from "../assets/imgs/instagram_logo_line_white.png";

export default {
  data() {
    return {
      isSettingsModalOpen: false,
      isSearchOpen: false,
      isMobileSearchOpen: false,
      isCreateOpen: false,
      searchTxt: "",
      usersBySearch: [],
      isWantToCreate: false,
      isMoblieWantToCreate: false,
      isPost: true,
    };
  },
  created() {
    console.log("hi");
    if (window.innerWidth < 1260 && window.innerWidth > 770) {
      this.$store.dispatch({
        type: "setWindowMode",
        windowMode: "isTabletMode",
      });
    } else if (window.innerWidth < 770) {
      this.$store.dispatch({
        type: "setWindowMode",
        windowMode: "isMobileMode",
      });
    } else {
      this.$store.dispatch({
        type: "setWindowMode",
        windowMode: "isLabtopMode",
      });
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
      this.$store.dispatch({
        type: "loadUsersBy",
        filterBy: this.searchTxt,
      });
    },
    onLogout() {
      userService.logout();
    },
    onToggleCreate() {
      if (this.isWantToCreate) this.isWantToCreate = false;
      if (this.isMoblieWantToCreate) this.isMoblieWantToCreate = false;
      this.isCreateOpen = !this.isCreateOpen;
    },
    windowSizeHandeler(e) {
      if (
        e.currentTarget.innerWidth < 1260 &&
        e.currentTarget.innerWidth > 770 &&
        this.windowMode !== "isTabletMode"
      ) {
        if (this.isMobileSearchOpen) this.isMobileSearchOpen = false;
        if (this.isMoblieWantToCreate) this.isMoblieWantToCreate = false;
        this.$store.dispatch({
          type: "setWindowMode",
          windowMode: "isTabletMode",
        });
        this.isSettingsModalOpen = false;
        this.isMobileSearchOpen = false;
      } else if (
        e.currentTarget.innerWidth < 770 &&
        this.windowMode !== "isMobileMode"
      ) {
        if (this.isSearchOpen) this.isSearchOpen = false;
        this.$store.dispatch({
          type: "setWindowMode",
          windowMode: "isMobileMode",
        });
      } else if (
        e.currentTarget.innerWidth > 1260 &&
        this.windowMode !== "isLabtopMode"
      ) {
        this.$store.dispatch({
          type: "setWindowMode",
          windowMode: "isLabtopMode",
        });
      }
    },
    wantToCreate() {
      if (this.isMobileMode) {
        this.isMoblieWantToCreate = !this.isMoblieWantToCreate;
      } else {
        this.isWantToCreate = !this.isWantToCreate;
      }
    },
    changePostingSelection() {
      this.isPost = !this.isPost;
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
    windowMode() {
      return this.$store.getters.GetWindowMode;
    },
    isMobileMode() {
      if (this.windowMode === "isMobileMode") return true;
      else return false;
    },
    isTabletMode() {
      if (this.windowMode === "isTabletMode") return true;
      else return false;
    },
    darkMode() {
      return this.$store.getters.GetIsDarkMode;
    },
    logoSrc() {
      return this.darkMode ? instagramLogoWhite : instagramLogo;
    },
    logoTabletSrc() {
      return this.darkMode ? instagramLogoLineWhite : instagramLogoLine;
    },
  },
  components: {
    CreateModal,
    UsersList,
    SearchMobileBar,
  },
};
</script>
