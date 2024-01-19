<template>
  <section class="notifications-list">
    <article class="today" v-if="sortedNotifics.today.follower.length">
      <span>Today</span>
      <br />
      <div class="notic-follower-prev">
        <img class="user-img" :src="sortedNotifics.today.follower[0].fromUserInfo.imgUrl" />
        <div class="notic-info">
          <RouterLink :to="`/profile/${sortedNotifics.today.follower[0].fromUserInfo.userId}`">
            <span class="username-link">
              {{ sortedNotifics.today.follower[0].fromUserInfo.username }}
            </span>
          </RouterLink>
          <!-- &nbsp;
          <span @click="toggleListModal()" class="and-others" v-if="sortedNotifics.today.follower.length >= 2">
            and others
            </span> -->

          <span style="font-weight: normal;">
            started {{ "\n" }} following you.
            {{
              this.noticTimeToShow(sortedNotifics.today.follower[0].createdAt)
            }} ago 
          </span>
        </div>
        <button
          @click="
            this.onToggleFollow(
              sortedNotifics.today.follower[0],
              'today',
              'follower',
              0
            )
          "
          :class="`notic-follower-btn ${
            sortedNotifics.today.follower[0].fromUserInfo.isFollowing
              ? ''
              : 'not-following'
          }`"
        >
          {{
            sortedNotifics.today.follower[0].fromUserInfo.isFollowing
              ? "Following"
              : "Follow"
          }}
        </button>
      </div>
    </article>
  </section>
</template>
// ${sortedNotifics.today.follower[0].fromUserInfo.fromUserId}
<script>
import { followService } from "../services/follow.service";
export default {
  data() {
    return {
      notifications: null,
      sortedNotifics: {
        today: { follower: [], like: [], comment: [] },
        yesterday: { follower: [], like: [], comment: [] },
        thisWeek: { follower: [], like: [], comment: [] },
        thisMonth: { follower: [], like: [], comment: [] },
        earlier: { follower: [], like: [], comment: [] },
      },
      isListModalOpen: false,
    };
  },
  async created() {
    console.log(this.following);
    try {
      await this.$store.dispatch({ type: "loadUserNotifications" });
    } catch (error) {
      throw Error(
        "front: notifications-list - can't create new notifications" + error
      );
    }
  },
  methods: {
    async sortNotifics(newValue) {
      let day;
      let type;
      try {
        this.sortedNotifics = await newValue.reduce((acc, notic, idx) => {
          if (!idx) acc = this.sortedNotifics;
          type = notic.type;
          let hoursDiff = this.noticTimeAgo(notic.createdAt);
          if (hoursDiff <= 24) day = "today";
          else if (hoursDiff >= 25 && hoursDiff <= 168) day = "thisWeek";
          else if (hoursDiff >= 168 && hoursDiff <= 730) day = "thisMonth";
          else day = "earlier";

          acc[day][type].push(notic);
          if (!idx) console.log(acc);

          return acc;
        }, {});

        // console.log(
        //   "sortedNotifics.today.follower[0] \n",
        //   this.sortedNotifics.today.follower[0]
        // );
      } catch (error) {
        if (!newValue.length)
          return console.log(
            "front: notifications-list - no new notifications"
          );
        throw Error(
          "front: notifications-list - can't sort new notifications" + error
        );
      }
    },
    noticTimeAgo(time) {
      const now = new Date().getTime();
      const noticTime = new Date(time).getTime();
      let diff = (now - noticTime) / 1000;

      // Calculate hours, minutes, and seconds
      const hours = Math.floor(diff / 3600);
      let min = Math.floor((diff % 3600) / 60);
      let sec = Math.floor(diff % 60);
      sec /= 10000;

      if (hours >= 1) return hours;
      else if (min >= 1) {
        min /= 100;
        return min;
      } else {
        return sec;
      }
    },
    noticTimeToShow(time) {
      let hoursDiff = this.noticTimeAgo(time);
      // hoursDiff += 15;
      console.log(hoursDiff);
      let timeToShow = "";
      let timeCalc = (diff) => {
        diff /= 24;
        diff = Math.floor(diff);
        return diff;
      };
      if (hoursDiff < 0.01) {
        hoursDiff *= 10000;
        return (timeToShow += hoursDiff + "s");
      } else if (hoursDiff >= 0) {
        hoursDiff *= 100;
        return (timeToShow += hoursDiff + "m");
      }
      if (hoursDiff <= 24) timeToShow += hoursDiff + "h";
      else if (hoursDiff >= 25 && hoursDiff <= 168) {
        hoursDiff = timeCalc(hoursDiff);
        timeToShow += hoursDiff + "d";
      } else if (hoursDiff >= 168 && hoursDiff <= 730) {
        hoursDiff = timeCalc(hoursDiff);
        timeToShow += hoursDiff + "w";
      } else {
        hoursDiff = timeCalc(hoursDiff);
        timeToShow += hoursDiff + "m";
      }

      return timeToShow;
    },
    toggleListModal() {
      this.$emit("onToggleNoticList", this.sortedNotifics.today.follower);
    },

    async onToggleFollow(fromUser, time, were, idx) {
      // this.$store.dispatch("unfollowUser", userId);
      // let userId = fromUser.fromUserInfo.userId;
      // console.log(idx);
      // console.log(
      //   "this.sortedNotifics[time][were][idx].fromUserInfo.isFollowing",
      //   this.sortedNotifics[time][were][idx].fromUserInfo.isFollowing
      // );
      // try {
      //   if (fromUser.fromUserInfo.isFollowing)
      //     await followService.unFollow(userId);
      //   else await followService.addFollow(userId);
      //   this.sortedNotifics[time][were][idx].fromUserInfo.isFollowing =
      //     !this.sortedNotifics[time][were][idx].fromUserInfo.isFollowing;
      // } catch (err) {
      //   console.error(err);
      // }
    },
  },

  computed: {
    today() {
      let today = this.sortedNotifics.today;
      if (today.followers.length || today.likes.length || today.comments.length)
        return true;
      else return false;
    },
    following() {
      return this.$store.getters.getIsFollowing;
    },
  },
  watch: {
    "$store.getters.getNotifications": {
      deep: true,
      async handler(newValue) {
        try {
          await this.sortNotifics(newValue);
        } catch (error) {
          throw Error(
            "front: notifications-list - can't get new notifications" + error
          );
        }
      },
    },
  },
};
</script>

<style>
</style>