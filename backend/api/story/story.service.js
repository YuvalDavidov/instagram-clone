const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const { instegramStories } = require('../../services/models/models')

query({ _id: 'ks', following: ['bla', 'pipi'] }, 'byFollowing')

async function query(entity, filterBy) {
    if (filterBy === 'userId' || filterBy === 'storyId') filterBy = entity
    else if (filterBy === 'byFollowing') filterBy = { userInfo: { userId: entity.following } }
    try {
        let stories = await dbService.query(instegramStories, filterBy)
        let storiesIds = [...new Set(stories.map(story => { return story.userInfo.userId }))]
        console.log(storiesIds);
        return storiesIds
    } catch (error) {
        logger.error('story.service - cannot get story', error)
        throw new Error('story.service - cannot get story', error)
    }
}

// addStory({
//     imgUrl: 'https://res.cloudinary.com/dp32ucj0y/image/upload/v1674918908/cgsfbltc4pczqaqnciet.jpg',
//     userInfo: {
//         userId: 'pipi',
//         username: 'blabla',
//         userImg: 'balbal'
//     }
// })

async function addStory(story) {
    try {
        const newStory = await dbService.addRecord(instegramStories, story)
        console.log(newStory);
        // return newStory
    } catch (error) {
        logger.error('story.service - cannot add story', err)
        throw new Error('story.service - cannot add story', err)
    }
}

async function removeStory(storyId) {
    try {
        await dbService.removeRecord(instegramStories, storyId)
    } catch (error) {
        logger.error('story.service - cannot remove story', err)
        throw new Error('story.service - cannot remove story', err)
    }
}

async function updateStory(sawUser) {
    try {
        await dbService.updateRecord(instegramStories, sawUser)
    } catch (error) {
        logger.error('story.service - cannot update story', err)
        throw new Error('story.service - cannot update story', err)
    }
}

module.exports = {
    query,
    addStory,
    removeStory,
    updateStory
}
