<template>
  <section v-bind:class="{ full: !user }">
    <section v-if="user" class="home-index">
      <div class="top">
        <StoriesList />
        <PostIndexHome />
      </div>
    </section>
    <section class="welcome-page" v-if="!user">
      <div class="iphone-container" v-if="!isSignUp && !isMobileMode">
        <img src="../assets/imgs/example-img-1.png" class="inside-img" />
        <img src="../assets/imgs/iphone-transparent.png" class="iphone" />
      </div>
      <div class="login-div">
        <div class="first-div">
          <img class="logo" src="../assets/imgs/picgram_logo_line.png" />
          <form @submit.prevent="isSignUp ? onSignUp() : onLogin()">
            <input
              v-if="!isSignUp"
              v-model="loginCredentials.username"
              aria-required="true"
              type="text"
              placeholder="Phone number, username, or email"
              name="username"
            />
            <input
              v-if="!isSignUp"
              v-model="loginCredentials.password"
              aria-required="true"
              type="password"
              name="password"
              placeholder="Password"
            />
            <input
              v-if="isSignUp"
              v-model="newUser.fullname"
              aria-required="true"
              type="text"
              placeholder="Fullname"
              name="fullname"
            />
            <input
              v-if="isSignUp"
              v-model="newUser.username"
              aria-required="true"
              type="text"
              placeholder="Username"
              name="username"
            />
            <span v-if="user === false">username is allready taken</span>
            <input
              v-if="isSignUp"
              v-model="newUser.password"
              aria-required="true"
              type="password"
              name="password"
              placeholder="Password"
            />

            <button v-bind:disabled="isDisabled" class="login-btn">
              {{ !isSignUp ? "Log in" : "Sign up" }}
            </button>
          </form>
          <div v-if="!isSignUp" class="or-div">
            <div class="line"></div>
            <span class="OR">OR</span>
            <div class="line"></div>
          </div>
        </div>
        <div class="second-div">
          <span
            >{{ !isSignUp ? "Don't have an account?" : "Have an account?" }}
            <button @click="toSignUp()" class="signup-btn">
              {{ !isSignUp ? "Sign up" : "Log in" }}
            </button></span
          >
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { userService } from "../services/user.service"
import StoriesList from "../cmps/stories-list.vue"
import PostIndexHome from "../cmps/post-index-home.vue"
export default {
  components: {
      StoriesList,
      PostIndexHome,
    },
  data() {
    return {
      loginCredentials: { username: "", password: "" },
      isSignUp: false,
      newUser: userService.getEmptyUser(),
    };
  },

  created() {
    if (window.innerWidth < 1260 && window.innerWidth > 770) {
      this.$store.dispatch({type: "setWindowMode", windowMode: "isTabletMode"})
    } else if (window.innerWidth < 770) {
      this.$store.dispatch({ type: "setWindowMode", windowMode: "isMobileMode"})
    } else {
      this.$store.dispatch({ type: "setWindowMode", windowMode: "isLabtopMode"})
    }
    window.addEventListener("resize", this.windowSizeHandeler);
  },
  destroyed() {
    window.removeEventListener("resize", this.windowSizeHandeler);
  },

  methods: {
    async onLogin() {
      this.$store.dispatch({
        type: "login",
        credentials: this.loginCredentials,
      });
    },
    async onSignUp() {
      this.$store.dispatch({ type: "signUp", user: this.newUser });
    },
    toSignUp() {
      this.isSignUp = !this.isSignUp;
      console.log(this.isSignUp);
    },
    windowSizeHandeler(e) {
    if (
      e.currentTarget.innerWidth < 1260 &&
      e.currentTarget.innerWidth > 770 &&
      this.windowMode !== "isTabletMode"
    ) {
      this.$store.dispatch({ type: "setWindowMode", windowMode: "isTabletMode"})
    } else if (
      e.currentTarget.innerWidth < 770 &&
      this.windowMode !== "isMobileMode"
    ) {
      this.$store.dispatch({ type: "setWindowMode", windowMode: "isMobileMode"})
    } else if (
      e.currentTarget.innerWidth > 1260 &&
      this.windowMode !== "isLabtopMode"
    ) {
      this.$store.dispatch({ type: "setWindowMode", windowMode: "isLabtopMode"})
    }
  },
  },
  
  computed: {
    user() {
      return this.$store.getters.GetUser;
    },
    windowMode() {
      return this.$store.getters.GetWindowMode;
    },
    isDisabled() {
      if (
        this.loginCredentials.username.length > 4 &&
        this.loginCredentials.password.length > 5 &&
        !this.isSignUp
      )
        return false;
      else if (
        this.newUser.username.length > 4 &&
        this.newUser.password.length > 5 &&
        this.isSignUp
      )
        return false;
      else return true;
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
    
  },
};
</script>

<style>
</style>