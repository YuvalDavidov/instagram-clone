import { notificationsService } from "../services/notifications.service"



export const notificationStore = {
    state: {
        notifications: [],
        unsawNotifictions: null,
        unsawMesseges: [],
    },
    getters: {
        getNotifications({ notifications }) {
            return notifications
        },
        getUnsawNotifications({ unsawNotifictions }) {
            return unsawNotifictions
        },
        getUnsawMesseges({ unsawMesseges }) {
            return unsawMesseges
        }
    },
    mutations: {
        setUnsawNotifications(state, { unsawNotifictions }) {
            state.unsawNotifictions = unsawNotifictions
        },
        setUnsawMesseges(state, { unsawMesseges }) {
            state.unsawMesseges = unsawMesseges
        },
    },
    actions: {
        async loadUserUnsawNotifications({ commit }) {
            try {
                const unsawNotifictions = await notificationsService.getUserUnsawNotifications()
                console.log(unsawNotifictions);
                // commit({ type: 'setUnsawNotifications', unsawNotifictions: unsawNotifictions })
            } catch (error) {
                throw Error('store - coudl\'nt get user unsaw notifications', error)
            }
        },

    }
}