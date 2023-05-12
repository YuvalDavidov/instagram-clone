<template>
  <h3>Settings</h3>

  <section class="edit-modal">
    <nav>
        <button>Edit profile</button>
        <button>Change Password</button>
    </nav>
    <article class="edit-profile-article">
        <h2>Edit profile</h2>

        <section class="edit-actions">
            <div class="user-details">
                <img class="user-img" :src="user.imgUrl">
                <div>
                <span>{{ user.fullname }}</span>
                <button>Change profile photo</button>
            </div>
            </div>
            <form class="edit-form" @submit.prevent="submit">
                <label for="website"><span>Website</span> <input v-model="user.website" type="text" id="website" placeholder="Website"></label>
                
                <label class="bio" for="bio"><span>Bio</span> <textarea v-model="user.bio" name="" id="bio" cols="30" rows="10"></textarea></label>
                <span class="words-count">{{ wordsCount }} / 150</span>
                <label @click.prevent="toggleGenderModal" for="gender"><span>Gender</span> <input disabled type="text" id="gender" :placeholder="user.gender"></label>
                <label><span></span><button type="submit" class="submit-btn">Submit</button></label>
            </form>

        </section>
    </article>
  </section>
  <section class="gender-modal-container" v-if="isGenderModalOpen">
  <div @click="toggleGenderModal" class="back-screen" v-if="isGenderModalOpen"></div>
  <article class="gender-modal" v-if="isGenderModalOpen">
        <button class="close-modal-btn">X</button>
        <span class="modal-header">Gender</span>
        
  </article>
</section>
</template>

<script>

import { userService } from '../services/user.service'
export default {
    data() {
        return {
            user: null,
            isGenderModalOpen: false 
        }
    },
    async created() {
        this.user = this.$store.getters.GetUser
        
    },
    methods: {
        submit() {
            // console.log(this.user)
            userService.updateUser({...this.user, bio: this.user.bio, website: this.user.website})
        },
      
        toggleGenderModal() {
            this.isGenderModalOpen = !this.isGenderModalOpen
            
        }
    },
    computed: {
        wordsCount() {
            return this.user.bio.length
        }
    }
}
</script>

<style>

</style>