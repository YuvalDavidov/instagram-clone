const chatService = require('../../services/chat.service');
const logger = require('../../services/logger.service')

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
        res.status(500).send({ err: 'Failed create chat' })

    }
}

module.exports = {
    createNewChat
}