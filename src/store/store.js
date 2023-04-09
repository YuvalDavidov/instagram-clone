import { createStore } from 'vuex'
import { userService } from '../services/user.service'
import { postStore } from './post.store.js'
import { usersStore } from './users.store'
import { storyStore } from './story.store'


export const myStore = createStore({
    strict: true,
    state() {
        return {
            user: userService.getLoggedinUser(),
        }
    },
    getters: {
        User({ user }) {
            if (user) return true
            else return false
        },
        GetUser({ user }) {
            return user
        }
    },
    mutations: {
        setUser(state, { user }) {
            state.user = user
        }
    },
    actions: {
        async login({ commit }, { credentials }) {
            try {
                const user = await userService.login(credentials)
                commit({ type: 'setUser', user })
            } catch (err) {
                console.error(err, 'couldnt login')
            }
        },
        async signUp({ commit }, { user }) {
            try {
                await userService.signup(user)
                commit({ type: 'setUser', user })
            } catch (err) {
                console.error(err, 'couldnt signup')
            }
        }
    },
    modules: {
        postStore,
        usersStore,
        storyStore
    }
})

myStore.subscribe((cmd, state) => {
    console.log('Command:', cmd.payload)
    console.log('storeState:\n', state)
})

