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
            <form class="edit-form">
                <label for="website"><span>Website</span> <input type="text" id="website" placeholder="Website"></label>
                
                <label class="bio" for="bio"><span>Bio</span> <textarea name="" id="bio" cols="30" rows="10"></textarea> </label>
                <!-- <span class="words-count">{{ wordsCount }}</span> -->
                <label for="gender"><span>Gender</span> <input type="text" id="gender"></label>
                <label><span></span><button type="submit" class="submit-btn">Submit</button></label>
            </form>

        </section>
    </article>
  </section>
</template>

<script>
export default {
    data() {
        return {
            user: null,
            websiteTxt: '',
            bioTxt: ''
        }
    },
    async created() {
        this.user = this.$store.getters.GetUser
        console.log(this.user)
    },
    computed: {
        wordsCount() {
            return 0
        }
    }
}
</script>

<style>

</style>