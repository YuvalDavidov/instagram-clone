const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const { instegramStories } = require('../../services/models/models')


async function query(entity, condition) {
    let filterBy
    if (condition === 'userId') filterBy = { userInfo: { [condition]: entity } }
    else if (condition === 'byFollowing') filterBy = { userInfo: { userId: entity.following } }
    else filterBy = { _id: entity }
    try {
        let stories = await dbService.query(instegramStories, filterBy)
        if (condition === 'storyId') {
            console.log('stories--->', stories)
            return stories
        }
        else return [...new Set(stories.map(story => { return condition === 'userId' ? story._id : story.userInfo.userId }))]

    } catch (error) {
        logger.error('story.service - cannot get story', error)
        throw new Error('story.service - cannot get story', error)
    }
}

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

async function updateStory(sawUser, storyId) {
    try {
        await dbService.appendToColumn(instegramStories, sawUser, 'sawUsers', storyId)
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
