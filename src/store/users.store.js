import { userService } from "../services/user.service"

export const usersStore = {
    state: {
        users: [],
        searchedUsers: []
    },
    getters: {
        filterdByUsers({ users }) {
            return users
        }
    },
    mutations: {
        setUsers(state, { users }) {
            state.users = users
        }
    },
    actions: {
        async loadUsersBy({ commit }, { filterBy }) {
            try {
                if (!filterBy.length) {
                    commit({ type: 'setUsers', users: [] })
                    return
                }
                const users = await userService.query(filterBy)
                commit({ type: 'setUsers', users })
            } catch (error) {
                console.log(error, 'couldnt load users');
            }
        }
    },

}