const chatService = require('../../services/chat.service');
const tokenService = require('../../services/token.service')
const logger = require('../../services/logger.service')

async function getUserChatsIds(req, res) {

    const loggedinUser = tokenService.validateToken(req.cookies.loginToken)
    try {
        const chatIds = await chatService.queryChatIds(loggedinUser._id)
        res.json(chatIds)
    } catch (err) {
        logger.error('Failed to get chatIds' + err)
        res.status(500).send({ err: 'Failed to get chatIds' })

    }
}

async function createNewChat(req, res) {
    const betweenUsers = req.body
    let topic
    try {
        const isChatExist = await chatService.checkIfChatExist(betweenUsers)
        if (!isChatExist) {
            topic = await chatService.createNewChat(betweenUsers)
        } else topic = isChatExist
        res.json(topic)
    } catch (err) {
        logger.error('Failed to create chat' + err)
        res.status(500).send({ err: 'Failed create chat' })

    }
}

module.exports = {
    getUserChatsIds,
    createNewChat
}