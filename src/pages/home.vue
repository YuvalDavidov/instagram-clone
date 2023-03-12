<template>

    <section>

        <section v-if="user"></section>
        <section class="welcome-page" v-if="!user">
            <div class="login-form">
                <img src="../assets/imgs/Instagram_logo.png">
                <form>
                    <input type="text" placeholder="Phone number, username, or email" name="username">
                    <input type="password" name="password" placeholder="Password">
                </form>
            </div>
            <div class="img-container">
                <img src="../assets/imgs/iphone-transparent.png">
            </div>
        </section>
    </section>
    
</template>

<script>
import { userService } from '../services/user.service';
export default {
    data() {
        return {
            user: userService.user()
        }
    },
    async created() {
        
    }
};
</script>

<style>
</style>