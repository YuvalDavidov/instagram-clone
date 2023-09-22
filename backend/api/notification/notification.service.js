const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const socketService = require('../../services/socket.service.js')
const { instegramNotifications } = require('../../services/models/models')

module.exports = {
    query,
    addNotification
}

async function query(type, userId, numberOfResultsWanted = 1000) {
    try {
        const filterBy = { userId, type }
        const notific = await dbService.query(instegramNotifications, filterBy, numberOfResultsWanted)
        return notific
    } catch (error) {

        logger.error('notification.service - cannot find unsaw notification', error)
        throw new Error('notification.service - cannot find unsaw notification', error)
    }
}

async function addNotification(notific) {
    const { type, fromUser, toUser } = notific
    try {
        const _id = utilService.makeId(10)
        console.log("toUser", toUser);
        const data = { _id: _id, userId: toUser, type: type, fromUser: fromUser }
        const result = await dbService.addRecord(instegramNotifications, data)
        socketService.emitToUser({ type: 'new-notification', data: result.dataValues, userId: toUser })
        console.log(result);
    } catch (error) {
        logger.error('notification.service - cannot add notification', error)
        throw new Error('notification.service - cannot add notification', error)
    }
}