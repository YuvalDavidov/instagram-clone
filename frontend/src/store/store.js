import { createStore } from 'vuex'
import { userService } from '../services/user.service'
import { postStore } from './post.store.js'
import { usersStore } from './users.store'
import { storyStore } from './story.store'
import { chatStore } from './chat.store'
import { notificationStore } from './notification.store'
import { followStore } from './follow.store'


export const myStore = createStore({
    strict: true,
    state() {
        return {
            user: userService.getLoggedinUser(),
            windowMode: 'isLaptopMode',
            isDarkMode: false,
            isLoading: false
        }
    },
    getters: {
        User({ user }) {
            if (user) return true
            else return false
        },
        GetUser({ user }) {
            return user
        },
        GetWindowMode({ windowMode }) {
            return windowMode
        },
        GetIsDarkMode({ isDarkMode }) {
            return false
        },
        IsLoading({ isLoading }) {
            if (isLoading) return true
            else return false
        }
    },
    mutations: {
        setUser(state, { user }) {
            state.user = user
            if (user) state.isDarkMode = user.darkMode
        },
        setWindowMode(state, { windowMode }) {
            state.windowMode = windowMode
        },
        setLoading(state) {
            state.isLoading = !state.isLoading
        }
    },
    actions: {
        async login({ commit }, { credentials }) {
            try {
                const user = await userService.login(credentials)
                commit({ type: 'setUser', user })
                return false
            } catch (err) {
                console.error(err, 'couldnt login')
                return false
            }
        },
        async signUp({ commit }, { user }) {
            try {
                console.log('in store actions ---------->', user)
                user = await userService.signup(user)
                commit({ type: 'setUser', user })
            } catch (err) {
                commit({ type: 'setUser', user: false })
                console.error(err, 'couldnt signup')

            }
        },
        setWindowMode({ commit }, { windowMode }) {
            commit({ type: 'setWindowMode', windowMode })
        },
        toggleLoader({ commit }) {
            commit({ type: 'setLoading' })
        }
    },
    modules: {
        postStore,
        usersStore,
        storyStore,
        chatStore,
        notificationStore,
        followStore
    }
})

myStore.subscribe((cmd, state) => {
    if (cmd.payload.type === 'setNotifications' || cmd.payload.type === 'setUnsawNotifications') {

        // console.log('Command:', cmd.payload.type)
        // console.log('storeState:\n', state.notificationStore)

    }
})