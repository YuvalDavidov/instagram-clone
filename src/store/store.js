import { createStore } from 'vuex'
import { userService } from '../services/user.service'
// import { userStore } from './user.store.js'

// import { contactStore } from './contact.store.js'


export const myStore = createStore({
    strict: true,
    state() {
        return {

        }
    },
    getters: {

    },
    mutations: {

    },
    actions: {
        login(credentials) {

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

