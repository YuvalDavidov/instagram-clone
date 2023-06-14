import { storiesService } from "../services/stories.service"


export const storyStore = {
    state: {
        stories: [],
        userStories: [],
        story: null
    },
    getters: {
        getStories({ stories }) {
            return stories
        },
        getUserStories({ userStories }) {
            return userStories
        },
        getStory({ story }) {
            return story
        }
    },
    mutations: {
        setStories(state, { stories }) {
            state.stories = stories
        },
        setUserStories(state, { stories }) {
            state.userStories = stories
        },
        setStory(state, { story }) {
            state.story = story
        },
        setUserSawStory(state, { userId }) {
            state.story.sawUsers.push(userId)
        }
    },
    actions: {
        async loadStories({ commit }) {
            try {
                const stories = await storiesService.getStoriesByFollowings()
                console.log(stories);
                commit({ type: 'setStories', stories })
            } catch (error) {
                throw new Error('coudl\'nt get stories', error)

            }
        },
        async loadUserStories({ commit }, { userId }) {
            try {
                const stories = await storiesService.getStoriesIdByUserId(userId)
                commit({ type: 'setUserStories', stories })
            } catch (error) {
                throw new Error('coudl\'nt get user stories', error)

            }
        },
        async loadStory({ commit }, { storyId }) {
            try {
                const story = await storiesService.getStoryById(storyId)
                commit({ type: 'setStory', story })
            } catch (error) {
                throw new Error('coudl\'nt get story', error)
            }
        },
        async userSawStory({ commit }) {
            try {
                if (!this.state.storyStore.story.sawUsers.includes(this.state.user._id) && this.state.storyStore.story.userInfo.userId !== this.state.user._id) {
                    await commit({ type: 'setUserSawStory', userId: this.state.user._id })
                    storiesService.updateStory(this.state.storyStore.story)
                }
            } catch (error) {
                throw new Error('coudl\'nt update sawUsers story', error)
            }
        }
    },
}