const logger = require('../../services/logger.service')
const storyService = require('./story.service.js')
const authService = require('../auth/auth.service')
const { getById } = require('../user/user.service')

async function getStoriesByFollowing(req, res) {

    const { userId } = req.query
    try {
        const following = await getById(userId, ['following'])
        const stories = await storyService.query(following, condition = 'byFollowing')
        res.json(stories)
    } catch (error) {
        // logger.error('story controller - cannot get stories' + error)
        // res.status(401).send({ error: `Failed to get stories ${error}` })
    }
}

async function getStoriesByUserId(req, res) {
    let userId = req.params._id
    try {
        const stories = await storyService.query(userId, condition = 'userId')
        res.json(stories)
    } catch (error) {
        // logger.error('story controller - cannot get user stories' + error)
        // res.status(401).send({ error: `Failed to get user stories ${error}` })
    }
}

async function getStoryById(req, res) {
    let storyId = req.params._id
    const loggedinUser = authService.validateToken(req.cookies.loginToken)
    try {
        const story = await storyService.query(storyId, condition = 'storyId')
        if (!story.sawUsers.includes(loggedinUser._id.toString()) && story.userInfo.userId !== loggedinUser._id) await storyService.updateStory(loggedinUser._id.toString(), storyId, res)
        res.json(story)
    } catch (error) {
        // logger.error('story controller - cannot get story' + error)
        // res.status(401).send({ error: `Failed to get story ${error}` })
    }
}

async function addStory(req, res) {
    let newStory = req.body
    const loggedinUser = authService.validateToken(req.cookies.loginToken)
    newStory.userInfo = {
        userId: loggedinUser._id,
        username: loggedinUser.username,
        userImgUrl: loggedinUser.imgUrl
    }
    try {
        const addedStory = await storyService.addStory(newStory)
        res.json(addedStory)
    } catch (error) {
        logger.error('story controller - cannot add story' + error)
        res.status(401).send({ error: `Failed to add story ${error}` })
    }
}

async function removeStoy(req, res) {
    try {
        await storyService.removeStory(req.params.storyId)
    } catch (error) {
        logger.error('story controller - cannot remove story' + error)
        res.status(401).send({ error: `Failed to remove story ${error}` })
    }
}

async function updateStory(loggedinUserId, storyId, res) {

    try {
        return await storyService.updateStory(loggedinUserId, storyId)
    } catch (error) {
        logger.error('story controller - cannot update story' + error)
        res.status(401).send({ error: `Failed to update story ${error}` })
    }
}

module.exports = {
    getStoriesByFollowing,
    getStoriesByUserId,
    getStoryById,
    addStory,
    removeStoy,
    updateStory
}