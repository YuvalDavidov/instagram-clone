const utilService = require('./util.service');
const logger = require('./logger.service')
const dbService = require('./db.service')
const { instegramChats, instegramUsers } = require('./models/models')

queryChatIds('9493004838')
async function queryChatIds(userId) {
    console.log('here2', userId);
    try {
        const chatIds = await dbService.queryAggregate(instegramChats, instegramUsers, userId)
        // console.log(chatIds);
        return { chatIds: ['123', '546'], usersInfo: [{ username: 'kaka', imgUrl: 'ss' }, { username: 'pipi', imgUrl: 'ss' }] }
    } catch (error) {
        logger.error('chat service - can not get chatIds' + error)
    }
}

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
        await dbService.addRecord(instegramChats, data)
        return topicId
    } catch (err) {
        logger.error('chat.service - cannot add new chat', err)
        throw new Error('chat.service - cannot add new chat', err)
    }
}

module.exports = {
    queryChatIds,
    addMsgToChat,
    getChatById,
    createNewChat,
    checkIfChatExist
}