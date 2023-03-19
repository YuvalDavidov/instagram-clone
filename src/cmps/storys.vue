<template>
  <section class="storys">
    <li v-for="story in storys" :key="story.id" class="story">
      <img v-bind:src="story.userImg" class="user-img" />
      <p class="user-name">{{ story.userId }}</p>
    </li>
  </section>
</template>

<script>
export default {
  data() {
    return {
      storys: [
        {
          userId: "u01",
          id: "s01",
          userImg: "src/assets/imgs/dummy-user.jpg",
          timeStampe: "",
        },
        {
          userId: "u02",
          id: "s02",
          userImg: "src/assets/imgs/dummy-user.jpg",
          timeStampe: "",
        },
        {
          userId: "u03",
          id: "s03",
          userImg: "src/assets/imgs/dummy-user.jpg",
          timeStampe: "",
        },
        {
          userId: "u04",
          id: "s04",
          userImg: "src/assets/imgs/dummy-user.jpg",
          timeStampe: "",
        },
        {
          userId: "u05",
          id: "s05",
          userImg: "src/assets/imgs/dummy-user.jpg",
          timeStampe: "",
        },
        {
          userId: "u06",
          id: "s05",
          userImg: "src/assets/imgs/dummy-user.jpg",
          timeStampe: "",
        },
        {
          userId: "u07",
          id: "s05",
          userImg: "src/assets/imgs/dummy-user.jpg",
          timeStampe: "",
        },
        {
          userId: "u08",
          id: "s05",
          userImg: "src/assets/imgs/dummy-user.jpg",
          timeStampe: "",
        },
        {
          userId: "u09",
          id: "s05",
          userImg: "src/assets/imgs/dummy-user.jpg",
          timeStampe: "",
        },
      ],
    };
  },
};
</script>

<style>
</style>