import { createStore } from 'vuex'
import { userService } from '../services/user.service'
import { postStore } from './post.store.js'

// import { contactStore } from './contact.store.js'


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
                if (!user) throw err
                commit({ type: 'setUser', user })
            } catch (err) {
                throw err
            }
        },
        async signUp({ commit }, { user }) {
            try {
                const newUser = await userService.signup(user)
                if (newUser) commit({ type: 'setUser', user })
                else throw console.error('couldnt log in');
            } catch (error) {
                throw error
            }
        }
    },
    modules: {
        postStore
        // userStore,
        // contactStore
    }
})

myStore.subscribe((cmd, state) => {
    console.log('Command:', cmd.payload)
    console.log('storeState:\n', state)
})

