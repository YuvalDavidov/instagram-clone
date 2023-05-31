<template>
  <h3 class="settings-header">Settings</h3>

  <section class="edit-modal">
    <nav class="edit-nav">
      <button
        @click="toggleEditSection('profile')"
        :active="editSection.editProfile"
      >
        Edit profile
      </button>
      <button @click="toggleEditSection('pass')" :active="editSection.editPass">
        Change Password
      </button>
    </nav>
    <article v-if="editSection.editPass" class="edit-password-article">
      <h2>Edit Password</h2>
      <section class="edit-password-actions">
        <form @submit.prevent="submitPassword" class="edit-password-form">
          <label for="curr-password"
            ><span>Current Password</span>
            <input
              v-model="password.currPassword"
              type="password"
              id="curr-password"
              placeholder="Current Password"
          /></label>
          <label for="new-password"
            ><span>New Password</span>
            <input
              v-model="password.newPassword"
              type="password"
              id="new-password"
              placeholder="New Password"
          /></label>
          <label for="confirm-password"
            ><span>Confirm new Password</span>
            <input
              @click="
                () => {
                  this.error.password = false;
                }
              "
              v-model="password.confirmNewPassword"
              type="password"
              id="confirm-password"
              placeholder="Confirm your Password"
          /></label>
          <label v-if="error.password"
            ><span></span
            ><span class="password-error">Passwords don't match!</span></label
          >
          <label
            ><span></span
            ><button
              :disabled="error.password"
              type="submit"
              class="submit-btn"
            >
              Submit
            </button></label
          >
        </form>
      </section>
    </article>
    <article v-if="editSection.editProfile" class="edit-profile-article">
      <h2>Edit Profile</h2>

      <section class="edit-profile-actions">
        <div class="user-details">
          <img class="user-img" :src="user.imgUrl" />
          <div>
            <span>{{ user.fullname }}</span>
            <input
              @change="onUploadImg"
              ref="fileInput"
              type="file"
              class="change-photo-input"
            />
            <button @click="selectFile">Change profile photo</button>
          </div>
        </div>
        <form class="edit-profile-form" @submit.prevent="submit">
          <label for="website"
            ><span>Website</span>
            <input
              @change="checkIfDetailsChanged"
              v-model="user.website"
              type="text"
              id="website"
              placeholder="Website"
          /></label>

          <label class="bio" for="bio"
            ><span>Bio</span>
            <textarea
              @change="checkIfDetailsChanged"
              v-model="user.bio"
              name=""
              id="bio"
              cols="30"
              rows="10"
            ></textarea>
          </label>
          <span class="words-count">{{ wordsCount }} / 150</span>
          <label @click.prevent="toggleGenderModal" for="gender"
            ><span>Gender</span>
            <input v-model="user.gender" disabled type="text" id="gender"
          /></label>
          <label
            ><span></span
            ><button
              :disabled="error.profileDetailsNotChanged"
              type="submit"
              class="submit-btn"
            >
              Submit
            </button></label
          >
        </form>
      </section>
    </article>
  </section>
  <section class="gender-modal-container" v-if="isGenderModalOpen">
    <div
      @click="toggleGenderModal"
      class="back-screen"
      v-if="isGenderModalOpen"
    ></div>
    <article class="gender-modal" v-if="isGenderModalOpen">
      <button @click="toggleGenderModal" class="close-modal-btn">X</button>
      <span class="gender-modal-header">Gender</span>
      <div class="gender-options">
        <label @click="chooseGender('male')" for="male"
          ><input
            type="radio"
            id="male"
            :checked="genderModal.isMaleChecked"
          /><span> Male</span></label
        >
        <label @click="chooseGender('female')" for="female"
          ><input
            type="radio"
            id="female"
            :checked="genderModal.isFemaleChecked"
          /><span> Female</span></label
        >
        <label @click="chooseGender('not')" for="not"
          ><input
            type="radio"
            id="not"
            :checked="genderModal.isNotPreferChecked"
          /><span> Prefer not to say</span></label
        >
      </div>
      <button class="submit-gender-btn" @click="submitGender">Done</button>
    </article>
  </section>
</template>

<script>
import { userService } from "../services/user.service";
import { uploadService } from "../services/upload.service";
export default {
  // errorCaptured(err)
  data() {
    return {
      user: null,
      isGenderModalOpen: false,
      choosenGender: null,
      genderModal: {
        isMaleChecked: false,
        isFemaleChecked: false,
        isNotPreferChecked: false,
      },
      password: {
        currPassword: null,
        newPassword: null,
        confirmNewPassword: null,
      },
      error: {
        password: false,
        profileDetailsNotChanged: true,
      },
      editSection: { editProfile: true, editPass: false },
    };
  },
  async created() {
    this.user = { ...this.$store.getters.GetUser };
    console.log(this.user);
  },
  methods: {
    submit() {
      userService.updateUser({
        ...this.user,
        bio: this.user.bio,
        website: this.user.website,
        gender: this.user.gender,
      });
    },
    async submitPassword() {
      if (this.password.newPassword !== this.password.confirmNewPassword) {
        this.error.password = true;
        return;
      }
      if (this.password.newPassword !== this.password.confirmNewPassword)
        this.error.password = false;
      // userService.changePassword(this.password.currPassword, this.password.newPassword, this.user._id)
    },
    selectFile() {
      this.$refs.fileInput.click();
    },
    async onUploadImg(ev) {
      let newImg = await uploadService.uploadImg(ev);
      this.user = { ...this.user, imgUrl: newImg.url };
      userService.updateUser({ ...this.user, imgUrl: newImg.url });
    },
    toggleEditSection(section) {
      this.editSection.editPass = section === "pass";
      this.editSection.editProfile = section === "profile";
    },
    checkIfDetailsChanged() {
      this.error.profileDetailsNotChanged =
        this.user.website !== this.$store.getters.GetUser.website ||
        this.user.bio !== this.$store.getters.GetUser.bio
          ? false
          : true;
    },
    chooseGender(gender) {
      this.genderModal.isMaleChecked = gender === "male";
      this.genderModal.isFemaleChecked = gender === "female";
      this.genderModal.isNotPreferChecked = gender === "not";
      this.choosenGender = gender;
    },
    submitGender() {
      this.user = {
        ...this.user,
        gender:
          this.choosenGender === "not"
            ? "Prefer not to say"
            : this.choosenGender.replace(
                this.choosenGender[0],
                this.choosenGender[0].toUpperCase()
              ),
      };
      this.isGenderModalOpen = !this.isGenderModalOpen;
    },
    toggleGenderModal() {
      this.isGenderModalOpen = !this.isGenderModalOpen;
    },
  },
  computed: {
    wordsCount() {
      return this.user.bio.length;
    },
  },
};
</script>
