<template>
  <img src="">
</template>

<script>
import {userService} from '../services/user.service'
export default {
    data() {
        return {
            txt: 'Hello'
        }
    },
    created() {
        const contactId = this.$route.params.username
    }
}
</script>

<style>

</style>