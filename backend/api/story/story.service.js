const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const { picgramStories } = require('../../services/models/models')


async function query(entity, condition) {
    let filterBy
    if (condition === 'userId') filterBy = { userInfo: { [condition]: entity } }
    else if (condition === 'byFollowing') filterBy = { userInfo: { userId: entity } }
    else filterBy = { _id: entity }
    filterBy = [{ ...filterBy }, condition]
    try {
        let stories = await dbService.query(picgramStories, filterBy)
        if (condition === 'storyId') {
            return stories
        }
        else return [...new Set(stories.map(story => { return condition === 'userId' ? story._id : story.userInfo.userId }))]

    } catch (error) {
        console.log(error)
        // logger.error('story.service - cannot get story', error)
        throw new Error('')
    }
}

async function addStory(story) {
    try {
        const newStory = await dbService.addRecord(picgramStories, story)
        return newStory
    } catch (error) {
        logger.error('story.service - cannot add story', error)
        throw new Error('story.service - cannot add story', error)
    }
}

async function removeStory(storyId) {
    try {
        await dbService.removeRecord(picgramStories, storyId)
    } catch (error) {
        logger.error('story.service - cannot remove story', error)
        throw new Error('story.service - cannot remove story', error)
    }
}

async function updateStory(sawUser, storyId) {
    try {
        await dbService.appendToColumn(picgramStories, sawUser, 'sawUsers', storyId)
    } catch (error) {
        logger.error('story.service - cannot update story', error)
        throw new Error('story.service - cannot update story', error)
    }
}

module.exports = {
    query,
    addStory,
    removeStory,
    updateStory
}
