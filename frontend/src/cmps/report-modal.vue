<template>
  <section>
    <article v-if="!didReport" class="report-modal">
      <header>
        <span style="font-weight: bold">Report</span>
        <button @click="onClose"><v-icon name="bi-x" scale="2" /></button>
      </header>
      <div class="report-q">Why are you reporting this post?</div>
      <nav class="report-nav">
        <button @click="onReport('It\'s spam')" class="report-btn">
          It's spam
          <v-icon
            scale="1.3"
            color="lightgray"
            name="md-keyboardarrowright-round"
          />
        </button>
        <button
          @click="onReport('Nudity or sexual activity')"
          class="report-btn"
        >
          Nudity or sexual activity
          <v-icon
            scale="1.3"
            color="lightgray"
            name="md-keyboardarrowright-round"
          />
        </button>
        <button @click="onReport('Hate speech or symols')" class="report-btn">
          Hate speech or symols
          <v-icon
            scale="1.3"
            color="lightgray"
            name="md-keyboardarrowright-round"
          />
        </button>
        <button
          @click="onReport('Violence or dangerous goods')"
          class="report-btn"
        >
          Violence or dangerous goods
          <v-icon
            scale="1.3"
            color="lightgray"
            name="md-keyboardarrowright-round"
          />
        </button>
        <button
          @click="onReport('Sale of illegal or regulated goods')"
          class="report-btn"
        >
          Sale of illegal or regulated goods
          <v-icon
            scale="1.3"
            color="lightgray"
            name="md-keyboardarrowright-round"
          />
        </button>
        <button @click="onReport('Bullying or harassment')" class="report-btn">
          Bullying or harassment
          <v-icon
            scale="1.3"
            color="lightgray"
            name="md-keyboardarrowright-round"
          />
        </button>
        <button
          @click="onReport('Intellectual property violation')"
          class="report-btn"
        >
          Intellectual property violation
          <v-icon
            scale="1.3"
            color="lightgray"
            name="md-keyboardarrowright-round"
          />
        </button>
        <button @click="onReport('Suicide or self-injurt')" class="report-btn">
          Suicide or self-injurt
          <v-icon
            scale="1.3"
            color="lightgray"
            name="md-keyboardarrowright-round"
          />
        </button>
        <button @click="onReport('Eating disorders')" class="report-btn">
          Eating disorders
          <v-icon
            scale="1.3"
            color="lightgray"
            name="md-keyboardarrowright-round"
          />
        </button>
        <button @click="onReport('Scam or fraud')" class="report-btn">
          Scam or fraud
          <v-icon
            scale="1.3"
            color="lightgray"
            name="md-keyboardarrowright-round"
          />
        </button>
        <button @click="onReport('False information')" class="report-btn">
          False information
          <v-icon
            scale="1.3"
            color="lightgray"
            name="md-keyboardarrowright-round"
          />
        </button>
        <button @click="onReport('I just don\'t like it')" class="report-btn">
          I just don't like it
          <v-icon
            scale="1.3"
            color="lightgray"
            name="md-keyboardarrowright-round"
          />
        </button>
      </nav>
    </article>
    <article v-if="didReport" class="report-modal report-complete">
      <header>
        <v-icon
          name="md-checkcircleoutline-round"
          color="lightgreen"
          scale="3"
        />
        <h5>Thanks for letting us know</h5>
        <small
          >Your feedback is important in helping us keep the <br />
          picgram community safe.</small
        >
      </header>
      <nav class="report-nav">
        <button style="color: red; font-weight: bold" class="report-btn">
          Block {{ username }}
          <v-icon
            scale="1.3"
            color="lightgray"
            name="md-keyboardarrowright-round"
          />
        </button>
        <button @click="onUnfollow" class="report-btn">
          Unfollow {{ username }}
          <v-icon
            scale="1.3"
            color="lightgray"
            name="md-keyboardarrowright-round"
          />
        </button>
        <button class="report-btn">
          Learn more
          <v-icon
            scale="1.3"
            color="lightgray"
            name="md-keyboardarrowright-round"
          />
        </button>
      </nav>
      <button @click="onClose" class="report-close-btn">Close</button>
    </article>
  </section>
</template>

<script>
import { followService } from "../services/follow.service";
import { reportService } from "../services/report.service";

export default {
  props: {
    username: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      didReport: false,
    };
  },
  methods: {
    async onReport(r) {
      try {
        await reportService.reportPost(r);
        this.didReport = true;
      } catch (error) {}
    },
    async onUnfollow() {
      await followService.unFollow(this.userId);
      this.onClose();
    },
    onClose() {
      this.$emit("onClose");
    },
  },
};
</script>

<style>
</style>