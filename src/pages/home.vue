<template>

    <section>

        <section v-if="user"></section>
        <section class="welcome-page" v-if="!user">
            <div class="img-container">
                <img src="../assets/imgs/iphone-transparent.png">
            </div>
            <div class="login-div">
                <div class="first-div">
                    <img class="logo" src="../assets/imgs/Instagram_logo.png">
                <form>
                    <input v-model="loginCredentials.username" aria-required="true" type="text" placeholder="Phone number, username, or email" name="username">
                    <input v-model="loginCredentials.password" aria-required="true" type="password" name="password" placeholder="Password">
                    <button v-bind:disabled="isDisabled"  class="login-btn">Log in</button>
                </form>
            <div class="or-div">
                <div class="line"></div>
                <span class="OR">OR</span>
                <div class="line"></div>
            </div>
            <a> <v-icon scale="1" color="#385185" name="fa-facebook-square" /> Log in with Facebook</a>
            <span class="forget-password">Forgot password?</span>
            </div>
            <div class="second-div">
                <span>Don't have an account? <button class="signup-btn">Sign up</button></span>
            </div>
            </div>
           
        </section>
    </section>
    
</template>

<script>
import { userService } from '../services/user.service';
export default {
    data() {
        return {
            user: userService.user(),
            loginCredentials: {username: '', password: ''}
        }
    },
    async created() {
        
    },
    computed: {
        isDisabled() {
            if (this.loginCredentials.username.length > 5 && this.loginCredentials.password.length > 5) return false
            else return true
            
        }
    }

};
</script>

<style>
</style>