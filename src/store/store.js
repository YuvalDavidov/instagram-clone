import { createStore } from 'vuex'
import { userService } from '../services/user.service'
// import { userStore } from './user.store.js'

// import { contactStore } from './contact.store.js'


export const myStore = createStore({
    strict: true,
    state() {
        return {
            user: null
        }
    },
    getters: {
        user() {
            return this.user
        }
    },
    mutations: {
        setUser(state, { user }) {
            state.user = user
            console.log('login');
        }
    },
    actions: {
        async login(credentials) {
            try {
                const user = await userService.login(credentials)
                this.commit({ type: 'setUser', user })
            } catch (err) {
                throw err
            }
        }
    },
    modules: {
        // userStore,
        // contactStore
    }
})

myStore.subscribe((cmd, state) => {
    console.log('Command:', cmd.payload)
    console.log('storeState:\n', state)
})

