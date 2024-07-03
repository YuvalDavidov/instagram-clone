<!--    <div
      class="close-bg"
      v-if="isWantToCreate || isSettingsModalOpen"
      @click="isWantToCreate ? wantToCreate() : onToggleSettings()"
    ></div> -->
<template>
  <section class="side-bar-container" v-bind:class="{ darkMode }" v-if="!isInStory">
    <section class="side-bar" v-if="!this.isMobileMode" v-bind:class="{ isSidebarWindowOpen, isClosing, isTabletMode, isWantToCreate
        // isSearchOpen,
}">
      <div class="logo">
        <RouterLink to="/">
          <img
            v-if="isSidebarWindowOpen || isTabletMode || isMobileMode"
            class="logo-line-img"
            :src="logoTabletSrc" 
          />
          <img
            v-if="!isSidebarWindowOpen && !isTabletMode"
            class="logo-img"
            :src="logoSrc"
          />
          
        </RouterLink>
      </div>
      <nav>
        <RouterLink @click="()=> {this.isSidebarWindowOpen = false; this.modal = ''; this.isWantToCreate = false}" active-class="active" to="/">
          <v-icon scale="1.6" name="fa-home" />
          <span :class="{ isClosing, isSidebarWindowOpen }" v-if="!isTabletMode">
            Home</span
          ></RouterLink
        >
        <button @click="onToggleSidebarWindow('search')" class="side-bar-btn">
          <v-icon scale="1.6" name="bi-search" /><span
            v-if="!isTabletMode"
            :class="{ isClosing, isSidebarWindowOpen }"
            >Search</span
          >
        </button>

        <RouterLink active-class="active" to="/messages">
          <v-icon scale="1.6" name="la-facebook-messenger" /><span
            v-if="!isTabletMode"
            :class="{ isClosing, isSidebarWindowOpen }"
            >Messages</span
          ></RouterLink
        >
        <!-- TODO -->

        <!-- <button class="notifications-btn side-bar-btn" @click="onToggleSidebarWindow('notic')">
          <div class="btn-container">
            <div
              class="dot-notic"
              v-if="
                notifications.followersNotifics.length ||
                notifications.likesNotofics.length
              "
            ></div>
            <v-icon
              name="fa-regular-heart"
              :color="darkMode ? 'white' : 'black'"
              scale="1.6"
            />
            <span
              v-if="!isTabletMode"
              :class="{ isClosing, isSidebarWindowOpen }"
              >Notifications
            </span>
          </div>
          <PopUpNotic
            v-if="
              notifications.followersNotifics.length ||
              notifications.likesNotofics.length
            "
            :notifications="notifications"
          />
        </button> -->

        <button v-if="!isWantToCreate" @click="wantToCreate()" class="side-bar-btn">
          <v-icon scale="1.6" name="bi-plus-square" />
          <span v-if="!isTabletMode" :class="{ isClosing, isSidebarWindowOpen }"
            >create</span
          >
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
            v-if="!isTabletMode"
            :class="{ isClosing, isSidebarWindowOpen }"
          >
            Profile</span
          ></RouterLink
        >
      </nav>
      <!-- <button @click="onToggleSettings()" class="settings-btn" v-bind:class="((modal==='settings') ? 'settings' : '')">
        <v-icon scale="1.6" name="co-hamburger-menu" />
        <span :class="{ isClosing, isSidebarWindowOpen }" v-if="!isTabletMode">More</span>
      </button> -->
    </section>

    <section class="mobile-bar" v-if="isMobileMode">
      <section class="top-bar">
        <div class="logo">
          <RouterLink to="/">
            <img class="logo-img" :src="logoTabletSrc" />
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
          
        </div>
        <RouterLink to="/notifications">
            <v-icon name="fa-regular-heart" color="black" scale="1.5" />
            <div
              class="dot-notic"
              :class="{ isMobileMode }"
              v-if="
                notifications.followersNotifics.length ||
                notifications.likesNotofics.length
              "
            ></div>
            <PopUpNotic
              v-if="
                notifications.followersNotifics.length ||
                notifications.likesNotofics.length
              "
              :notifications="notifications"
            />
          </RouterLink>
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

    <article v-if="(modal === 'mobileSearch')" class="search-mobile">
      <div class="bg-container" @click="onCloseMobileSearch()"></div>

      <SearchMobileBar @onCloseMobileSearch="onCloseMobileSearch" />
    </article>

    <article v-if="(modal === 'settings')" class="settings-modal">
      <section class="general-settings">
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

    <article v-if="isSidebarWindowOpen" class="side-bar-modal">
      <SideBarSideWindow
        @onToggleNoticList="onToggleNoticList"
        @onToggleSidebarWindow="onToggleSidebarWindow"
        :isSidebarWindowOpen="isSidebarWindowOpen"
        :isClosingProp="isClosing"
        :contant="sideWindowContant"
      />
      <div class="bg-container" @click="onToggleSidebarWindow()"></div>
      <div
        class="bg-container on-bar p1"
        @click="onToggleSidebarWindow()"
      ></div>
      <div
        class="bg-container on-bar p2"
        @click="onToggleSidebarWindow()"
      ></div>
      <div
        class="bg-container on-bar p3"
        @click="onToggleSidebarWindow()"
      ></div>
    </article>

    <article v-if="(modal === 'create')" class="create-post-modal">
      <section class="bg-container" @click="onToggleCreate()"></section>
      <CreateModal @onToggleCreate="onToggleCreate" :isPost="isPost" />
    </article>

    <article v-if="(modal === 'createMobile')" class="want-to-create-modal" >
      <button @click="onToggleCreate()" v-if="isPost">post</button>
      <button @click="onToggleCreate()" v-if="!isPost">story</button>

      <button @click="changePostingSelection">
        <v-icon v-if="isPost" name="md-keyboardarrowdown-round" />
        <v-icon v-if="!isPost" name="md-keyboardarrowup-round" />
      </button>
    </article>

    <article v-if="(modal === 'notification')" class="list-modal">
      <section class="lists-container">
        <section class="followers-list">
          <!-- <li
            class="list-info"
            v-for="followers in sortedNotifics.today.follower"
            :key="followers._id"
          >
            <div>{{ followers.fromUserInfo.username }}</div>
          </li> -->
        </section>
        <section class="likes-list"></section>
      </section>
      <div class="bg-container" @click="onToggleNoticList"></div>
    </article>
  </section>
</template>

<script>
import { userService } from "../services/user.service";

import CreateModal from "./create-modal.vue";
import SideBarSideWindow from "./side-bar-side-window.vue";
import UsersList from "./users-list.vue";
import SearchMobileBar from "./search-mobile-bar.vue";
import PopUpNotic from "./pop-up-notic.vue";

import picgramLogo from "../assets/imgs/picgram_logo_line.png";
import picgramLogoWhite from "../assets/imgs/picgram_logo_line_white.png";
import picgramLogoLine from "../assets/imgs/picgram_logo.png";
import picgramLogoLineWhite from "../assets/imgs/picgram_logo_white.png";
import { socketService } from "../services/socket.service";

export default {

  data() {
    return {
      modal: '',
      searchTxt: "",
      isClosing: false,
      isSwitching: false,
      isSidebarWindowOpen: false,
      timeoutId: null,
      usersBySearch: [],
      isWantToCreate: false,
      isPost: true,
      notifications: {
        msgsNotifics: [],
        likesNotofics: [],
        followersNotifics: [],
      },
      sideWindowContant: null,
      notificsListForModal: [],
    };
  },
  
  created() {
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
      if (this.isSidebarWindowOpen) this.isSidebarWindowOpen = false;
    } else {
      this.$store.dispatch({
        type: "setWindowMode",
        windowMode: "isLabtopMode",
      });
    }
    window.addEventListener("resize", this.windowSizeHandeler);
    socketService.on("new-notification", (data) => {
      this.sortNotifics(data);
    });
    this.$store.dispatch({ type: "loadUserUnsawNotifications" });
  },
  destroyed() {
    window.removeEventListener("resize", this.windowSizeHandeler);
  },
  methods: {
    onToggleNoticList(list) {
      this.isWantToCreate = false
      if (list.length) this.notificsListForModal = list;
      else this.notificsListForModal = [];
      (this.modal !== 'notification') ? this.modal = 'notification' : this.modal = ''
    },
    onToggleSettings() {
      this.isWantToCreate = false;
      (this.modal !== 'settings') ? this.modal = 'settings' : this.modal = '';
      this.isSidebarWindowOpen = false;
    },
    onToggleSidebarWindow(arg) {
      this.isWantToCreate = false;
      if (arg === undefined) {
        this.isClosing = true;
        this.timeoutId = setTimeout(() => { 
          this.isClosing = false; 
          this.isSidebarWindowOpen = false 
          clearTimeout(this.timeoutId)}, 500);
      } else if (this.isSidebarWindowOpen) {
        clearTimeout(this.timeoutId)
        this.isClosing = true
        if (this.sideWindowContant !== arg)
          this.isSwitching = !this.isSwitching
        this.timeoutId = setTimeout(() => {
          this.isClosing = false;
          this.isSidebarWindowOpen = false;
          clearTimeout(this.timeoutId);

          if (this.sideWindowContant !== arg) {
            this.sideWindowContant = arg;

            this.timeoutId = setTimeout(() => {
              this.isSwitching = !this.isSwitching;
              this.isSidebarWindowOpen = true
              clearTimeout(this.timeoutId);
            }, 100);
          }
        }, 500);
      } else if (this.sideWindowContant === arg && this.isSidebarWindowOpen) {

        this.sideWindowContant = null;
        this.isSidebarWindowOpen = true;
      } else {

        this.sideWindowContant = arg;
        this.isSidebarWindowOpen = true
      }
    },
    onOpenMobileSearch() {
      this.isWantToCreate = false
      this.modal = 'mobileSearch'
    },
    onCloseMobileSearch() {
      this.isSidebarWindowOpen = false
      this.modal = ''
    },
    onLogout() {
      userService.logout();
    },
    onToggleCreate() {
      (this.modal !== 'create') ? this.modal = 'create' : this.modal = ''
      if (this.isWantToCreate) this.isWantToCreate = false
      this.isSidebarWindowOpen = false
      // (this.modal === 'createMobile') ? this.modal = 'createMobile' : this.modal = ''
    },
    windowSizeHandeler(e) {
      this.modal = ''
      if (this.isSidebarWindowOpen) this.isSidebarWindowOpen = false;
      if (e.currentTarget.innerWidth < 1260 &&e.currentTarget.innerWidth > 770 && this.windowMode !== "isTabletMode") this.$store.dispatch({ type: "setWindowMode", windowMode: "isTabletMode"})
      else if (e.currentTarget.innerWidth < 770 && this.windowMode !== "isMobileMode") this.$store.dispatch({type: "setWindowMode", windowMode: "isMobileMode"})
      else if (e.currentTarget.innerWidth > 1260 && this.windowMode !== "isLabtopMode") {
        this.$store.dispatch({ type: "setWindowMode", windowMode: "isLabtopMode"})
      }
    },
    wantToCreate() {
      this.isSidebarWindowOpen = false
      if (this.isMobileMode) {
      (this.modal !== 'createMobile') ? this.modal = 'createMobile' : this.modal = ''
      } else {
        this.isWantToCreate = !this.isWantToCreate;
      }
    },
    changePostingSelection() {
      this.isPost = !this.isPost;
    },
    sortNotifics(data) {
      switch (data.type) {
        case "follower":
          this.notifications.followersNotifics.unshift(data);
          break;

        default:
          console.log("default");
          break;
      }
    },
    onSearch() {
      this.$store.dispatch({
        type: "loadUsersBy",
        filterBy: this.searchTxt,
      });
    },
    onClearSearch() {
      this.searchTxt = "";
      this.onSearch();
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
      if (this.windowMode === "isTabletMode" || this.isSwitching) return true;
      else return false;
    },
    darkMode() {
      return this.$store.getters.GetIsDarkMode;
    },
    logoSrc() {
      return this.darkMode ? picgramLogoWhite : picgramLogo;
    },
    logoTabletSrc() {
      return this.darkMode ? picgramLogoLineWhite : picgramLogoLine;
    },
  },
  watch: {
    "$store.getters.getUnsawNotifications": {
      handler(newValue) {
        if (!newValue.length) {
          this.notifications = {
            msgsNotifics: [],
            likesNotofics: [],
            followersNotifics: [],
          };
        } else newValue.forEach((value) => this.sortNotifics(value));
      },
      deep: true,
    },
    "$route.path": {
    async handler(newValue) {
      this.isSidebarWindowOpen = false
      this.modal = ''
      this.isWantToCreate = false
      },
      deep: true,
  },
  },
  
  components: {
    CreateModal,
    UsersList,
    SearchMobileBar,
    PopUpNotic,
    SideBarSideWindow,
  },
};
</script>
