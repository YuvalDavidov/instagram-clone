const utilService = require('./util.service');
const logger = require('./logger.service')
const dbService = require('./db.service')
const { picgramChats } = require('./models/models')

async function queryChatIds(userId) {
    let model1 = { model1Name: 'picgramChats', attributes1: ['_id', , 'betweenUsers', 'chatHistory', 'createdAt', 'updatedAt'] }
    let model2 = {
        model2Name: 'picgramUsers', attributes2: [{ attributeName: '_id', as: 'userId' }, { attributeName: 'fullname', as: 'fullname' },
        { attributeName: 'username', as: 'username' }, { attributeName: 'imgUrl', as: 'imgUrl' }]
    }
    let aggregateCondition = [{ modelName: 'picgramUsers', modelKey: '_id' }, { condition: '=' },
    { modelName: 'picgramChats', modelKey: 'betweenUsers', isArray: true }]
    let filterBy = [{ condition1: userId, conditionSymbol: '=', condition2: { modelName: 'picgramChats', modelKey: 'betweenUsers', isArray: true } },
    { condition1: userId, conditionSymbol: '<>', condition2: { modelName: 'picgramUsers', modelKey: '_id' } }]
    try {
        const chatIds = await dbService.queryAggregate(model1, model2, filterBy, aggregateCondition)
        return chatIds
    } catch (error) {
        logger.error('chat service - can not get chatIds' + error)
    }
}

async function addMsgToChat(msg, topic) {
    try {
        const existingChat = await getChatById(topic)
        if (existingChat) await dbService.appendToColumn(picgramChats, JSON.stringify(msg), 'chatHistory', topic)
        else return false

    } catch (error) {
        logger.error('chat service - can not add msg to chat' + error)
    }
}

async function getChatById(topic) {
    try {
        const chat = await dbService.queryOne(picgramChats, { _id: topic })
        return chat.chatHistory
    } catch (error) {
        logger.error('chat service - can not get chat history' + error)
    }
}

async function checkIfChatExist(users) {
    try {
        const chat = await dbService.checkIfChatExist(picgramChats, users)
        return chat[0]._id
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
        await dbService.addRecord(picgramChats, data)
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