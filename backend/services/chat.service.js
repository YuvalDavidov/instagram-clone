const dbService = require('./db.service')
const { instegramChats } = require('./models/models')

module.exports = {
    addMsgToChat
}

async function addMsgToChat(msg, topic) {
    console.log(msg, topic, 'chatservice');
    try {
        const existingChat = await getChatById(topic)
        if (existingChat) await dbService.appendToColumn(instegramChats, JSON.stringify(msg), 'chatHistory', topic)
        else await dbService.addRecord(instegramChats, JSON.stringify(msg))

    } catch (error) {
        console.log(error);
    }
}

async function getChatById(topic) {
    try {
        const chat = await dbService.queryOne(instegramChats, { _id: topic })
        return chat
    } catch (error) {
        return undefined
    }
}
