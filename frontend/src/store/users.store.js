import { userService } from "../services/user.service"

export const usersStore = {
    state: {
        users: [],
        searchedUsers: []
    },
    getters: {
        filterdByUsers({ users }) {
            return users
        },
        searchedUsers({ searchedUsers }) {
            return searchedUsers
        }
    },
    mutations: {
        setUsers(state, { users }) {
            state.users = users
        },
        setSearchedUsers(state, { user }) {
            if (state.searchedUsers.includes(user)) return
            state.searchedUsers.push(user)
        },
        removeAllSearchedUsers(state) {
            state.searchedUsers = []
        },
        removeOneSearchedUser(state, { userId }) {
            state.searchedUsers = state.searchedUsers.filter(user => user.userId !== userId)
        }
    },
    actions: {
        async loadUsersBy({ commit }, { filterBy }) {
            try {
                if (!filterBy.length) {
                    commit({ type: 'setUsers', users: [] })
                    return
                }
                console.log('in store !', filterBy)
                const users = await userService.query(filterBy)
                commit({ type: 'setUsers', users })
            } catch (error) {
                console.log(error, 'couldnt load users');
            }
        },
        addSearchedUser({ commit }, { user }) {
            commit({ type: 'setSearchedUsers', user })
        },
        removeAllSearchedUsers({ commit }) {
            commit({ type: 'removeAllSearchedUsers' })
        },
        removeOneSearchedUser({ commit }, { userId }) {
            commit({ type: 'removeOneSearchedUser', userId })
        }
    },

}