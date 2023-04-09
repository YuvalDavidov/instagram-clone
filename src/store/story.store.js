import { storiesService } from "../services/stories.service"


export const storyStore = {
    state: {
        stories: []
    },
    getters: {
        getStories({ stories }) {
            return stories
        }
    },
    mutations: {
        setStories(state, { stories }) {
            state.stories = stories
        }
    },
    actions: {
        async loadStories({ commit }) {
            try {
                const stories = await storiesService.getStoriesByFollowings()
                commit({ type: 'setStories', stories })
            } catch (error) {
                throw new Error('coudl\'nt get stories', error)

            }
        }
    },
}