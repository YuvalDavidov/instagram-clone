const utilService = require('./util.service');
const dbService = require('./db.service')
const { instegramChats } = require('./models/models')

async function addMsgToChat(msg, topic) {
    try {
        const existingChat = await getChatById(topic)
        if (existingChat) await dbService.appendToColumn(instegramChats, JSON.stringify(msg), 'chatHistory', topic)
        else return false

    } catch (error) {
        logger.error('chat service - can not add msg to chat' + error)
    }
}

async function getChatById(topic) {
    try {
        const chat = await dbService.queryOne(instegramChats, { _id: topic })
        return chat.chatHistory
    } catch (error) {
        logger.error('chat service - can not get chat history' + error)
    }
}

async function checkIfChatExist(users) {
    try {
        // dbService.
        return false
    } catch (error) {

    }
}

async function createNewChat(betweenUsers) {
    const topicId = utilService.makeId(8)
    const data = {
        _id: topicId,
        betweenUsers
    }
    try {
        console.log(data);
        await dbService.addRecord(instegramChats, data)
        return topicId
    } catch (err) {
        logger.error('chat.service - cannot add new chat', err)
        throw new Error('chat.service - cannot add new chat', err)
    }
}


module.exports = {
    addMsgToChat,
    getChatById,
    createNewChat,
    checkIfChatExist
}