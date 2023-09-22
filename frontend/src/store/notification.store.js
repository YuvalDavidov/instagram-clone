import { notificationsService } from "../services/notifications.service"



export const notificationStore = {
    state: {
        notifications: null,
        unsawNotifications: null,
        unsawMesseges: [],
    },
    getters: {
        getNotifications({ notifications }) {
            return notifications
        },
        getUnsawNotifications({ unsawNotifications }) {
            return unsawNotifications
        },
        getUnsawMesseges({ unsawMesseges }) {
            return unsawMesseges
        }
    },
    mutations: {
        setUnsawNotifications(state, { unsawNotifications }) {
            state.unsawNotifications = unsawNotifications
        },
        setUnsawMesseges(state, { unsawMesseges }) {
            state.unsawMesseges = unsawMesseges
        },
        setNotifications(state, { notifications }) {
            state.notifications = notifications
        },
    },
    actions: {
        async loadUserUnsawNotifications({ commit }) {
            try {
                const unsawNotifications = await notificationsService.getUserUnsawNotifications()
                commit({ type: 'setUnsawNotifications', unsawNotifications: unsawNotifications })
            } catch (error) {
                throw Error('store - coudl\'nt get user unsaw notifications', error)
            }
        },
        async loadUserNotifications({ commit }) {
            try {
                const notifications = await notificationsService.getUserNotifications()
                await commit({ type: 'setNotifications', notifications })
                commit({ type: 'setUnsawNotifications', unsawNotifications: [] })

            } catch (error) {
                throw Error('store - coudl\'nt get user notifications', error)

            }
        }

    }
}