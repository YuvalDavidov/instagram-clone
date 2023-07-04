import { chatService } from "../services/chat.service"


export const chatStore = {
    state: {
        chatsIds: {}
    },
    getters: {
        getChatsIds({ chatsIds }) {
            return chatsIds
        }
    },
    mutations: {
        setChatIds(state, { chatsIds }) {
            state.chatsIds = chatsIds
        }
    },
    actions: {
        async loadChatIds({ commit }) {
            try {
                const chatsIds = await chatService.query()
                commit({ type: 'setChatIds', chatsIds })
            } catch (error) {
                throw new Error('coudl\'nt get chatIds', error)

            }
        }
    }
}