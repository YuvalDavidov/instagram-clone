const logger = require('../../services/logger.service')
const storyService = require('./story.service.js')

async function getStoriesByFollowing(req, res) {
    let { loggedinUser } = req
    try {
        const stories = await storyService.query(loggedinUser.following, condition = 'byFollowing')
        console.log(stories);
    } catch (error) {
        logger.error('story controller - cannot get stories' + err)
        res.status(401).send({ err: `Failed to get stories ${err}` })
    }
}

async function getStoriesByUserId(req, res) {
    let userId = req.params._id
    try {
        const stories = await storyService.query(userId, condition = 'userId')
        console.log(stories);
    } catch (error) {
        logger.error('story controller - cannot get user stories' + err)
        res.status(401).send({ err: `Failed to get user stories ${err}` })
    }
}

async function getStoryById(req, res) {
    let storyId = req.params._id
    let { loggedinUser } = req

    try {
        const story = await storyService.query(storyId, condition = 'storyId')
        if (!story.sawUsers.incluse(loggedinUser._id) && story.userId !== loggedinUser) storyService.updateStory(loggedinUser._id)
        console.log(story);
    } catch (error) {
        logger.error('story controller - cannot get story' + err)
        res.status(401).send({ err: `Failed to get story ${err}` })
    }
}

async function addStory(req, res) {
    let newStory = req.body.story
    let { loggedinUser } = req
    newStory.userInfo = {
        userId: loggedinUser._id,
        username: loggedinUser.username,
        userImgUrl: loggedinUser.imgUrl
    }
    try {
        const addedStory = await storyService.addStory(newStory)
        res.json(addedStory)
    } catch (error) {
        logger.error('story controller - cannot add story' + err)
        res.status(401).send({ err: `Failed to add story ${err}` })
    }
}

async function removeStoy(req, res) {
    try {
        await storyService.removeStory(req.params.storyId)
    } catch (error) {
        logger.error('story controller - cannot remove story' + err)
        res.status(401).send({ err: `Failed to remove story ${err}` })
    }
}

module.exports = {
    getStoriesByFollowing,
    getStoriesByUserId,
    getStoryById,
    addStory,
    removeStoy
}