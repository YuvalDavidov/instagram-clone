import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import { myStore } from './store/store'

import './assets/main.scss'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
    BiSearch,
    FaFacebookSquare,
    FaHome,
    LaFacebookMessenger,
    CoHamburgerMenu,
    RiSettings5Line,
    BiClockHistory,
    LaBookmarkSolid,
    BiMoon,
    OiReport,
} from "oh-vue-icons/icons";

addIcons(BiSearch,
    FaHome,
    LaFacebookMessenger,
    CoHamburgerMenu,
    RiSettings5Line,
    BiClockHistory,
    LaBookmarkSolid,
    BiMoon,
    FaFacebookSquare,

    OiReport);


const app = createApp(App)

app.use(router)
app.component('v-icon', OhVueIcon)
// app.use(myStore)

app.mount('#app')



