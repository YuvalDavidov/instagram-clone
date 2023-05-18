import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { myStore } from './store/store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

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
    RiEditBoxLine,
    BiPlusSquare,
    FaRegularHeart,
    FaHeart,
    FaRegularComment,
    BiHeart,
    BiChat,
    BiSend,
    BiHeartFill,
    MdKeyboardarrowrightRound,
    MdKeyboardarrowleftRound,
    BiThreeDots,
    BiX,
    GiPauseButton,
    FaPlay,
    MdKeyboardarrowdownRound,
    MdKeyboardarrowupRound,
    MdCheckcircleoutlineRound
} from "oh-vue-icons/icons";

addIcons(BiSearch,
    FaHome,
    FaRegularHeart,
    FaHeart,
    FaRegularComment,
    LaFacebookMessenger,
    CoHamburgerMenu,
    RiSettings5Line,
    BiClockHistory,
    LaBookmarkSolid,
    BiMoon,
    FaFacebookSquare,
    RiEditBoxLine,
    OiReport,
    BiPlusSquare,
    BiHeart,
    BiChat,
    BiSend,
    BiHeartFill,
    MdKeyboardarrowrightRound,
    MdKeyboardarrowleftRound,
    BiThreeDots,
    BiX,
    GiPauseButton,
    FaPlay,
    MdKeyboardarrowdownRound,
    MdKeyboardarrowupRound,
    MdCheckcircleoutlineRound);


const app = createApp(App)

app.use(router)
app.component('v-icon', OhVueIcon)
app.use(myStore)
app.mount('#app')



