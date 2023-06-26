const dbService = require('./db.service')
const { instegramChats } = require('./models/models')

async function addMsgToChat(msg) {
    const { userId, txt, timestamp } = msg
    try {
        // if ()
        dbService.addRecord()
    } catch (error) {

    }
}
