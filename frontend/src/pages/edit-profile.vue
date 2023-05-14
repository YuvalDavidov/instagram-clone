<template>
    <h3 class="settings-header">Settings</h3>

    <section class="edit-modal">
        <nav class="edit-nav">
            <button @click="toggleEditSection('profile')" :active="editSection.editProfile">Edit profile</button>
            <button @click="toggleEditSection('pass')" :active="editSection.editPass">Change Password</button>
        </nav>
        <article v-if="editSection.editProfile" class="edit-profile-article">
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
                    <label for="website"><span>Website</span> <input v-model="user.website" type="text" id="website"
                            placeholder="Website"></label>

                    <label class="bio" for="bio"><span>Bio</span> <textarea v-model="user.bio" name="" id="bio" cols="30"
                            rows="10"></textarea></label>
                    <span class="words-count">{{ wordsCount }} / 150</span>
                    <label @click.prevent="toggleGenderModal" for="gender"><span>Gender</span> <input
                            v-model="(user.gender)" disabled type="text" id="gender"></label>
                    <label><span></span><button type="submit" class="submit-btn">Submit</button></label>
                </form>
            </section>
        </article>
    </section>
    <section class="gender-modal-container" v-if="isGenderModalOpen">
        <div @click="toggleGenderModal" class="back-screen" v-if="isGenderModalOpen"></div>
        <article class="gender-modal" v-if="isGenderModalOpen">
            <button @click="toggleGenderModal" class="close-modal-btn">X</button>
            <span class="gender-modal-header">Gender</span>
            <div class="gender-options">
                <label @click="chooseGender('male')" for="male"><input type="radio" id="male"
                        :checked="genderModal.isMaleChecked"><span> Male</span></label>
                <label @click="chooseGender('female')" for="female"><input type="radio" id="female"
                        :checked="genderModal.isFemaleChecked"><span> Female</span></label>
                <label @click="chooseGender('not')" for="not"><input type="radio" id="not"
                        :checked="genderModal.isNotPreferChecked"><span> Prefer not to say</span></label>

            </div>
            <button class="submit-gender-btn" @click="submitGender">Done</button>
        </article>
    </section>
</template>

<script>

import { userService } from '../services/user.service'
export default {
    data() {
        return {
            user: null,
            isGenderModalOpen: false,
            choosenGender: null,
            genderModal: {
                isMaleChecked: false,
                isFemaleChecked: false,
                isNotPreferChecked: false
            },
            editSection: {editProfile: true, editPass: false}
        }
    },
    async created() {
        this.user = this.$store.getters.GetUser

    },
    methods: {
        submit() {
            // console.log(this.user)
            userService.updateUser({ ...this.user, bio: this.user.bio, website: this.user.website, gender: this.user.gender })
        },
        toggleEditSection(section) {
            this.editSection.editPass = section === 'pass'
            this.editSection.editProfile = section === 'profile'
        },
        chooseGender(gender) {
            this.genderModal.isMaleChecked = gender === 'male';
            this.genderModal.isFemaleChecked = gender === 'female';
            this.genderModal.isNotPreferChecked = gender === 'not';
            this.choosenGender = gender

        },
        submitGender() {
            this.user = { ...this.user, gender: (this.choosenGender === 'not') ? 'Prefer not to say' : this.choosenGender.replace(this.choosenGender[0], this.choosenGender[0].toUpperCase()) }
            this.isGenderModalOpen = !this.isGenderModalOpen

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

<style></style>