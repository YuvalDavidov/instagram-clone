const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')

const { instegramUsers } = require('../../services/models/models')

module.exports = {
    appendToColumn,
    removeFromColumn
}

async function appendToColumn(itemId, logdinUserId, res) {
    try {
        await dbService.appendToColumn(instegramUsers, logdinUserId.toString(), 'followers', itemId)
        await dbService.appendToColumn(instegramUsers, itemId, 'following', logdinUserId.toString())

    } catch (err) {
        logger.error('follow service - cannot append to column' + err)
        res.status(401).send({ err: `Failed to append to column ${err}` })
    }
}

async function removeFromColumn(itemId, logdinUserId, res) {
    try {
        await dbService.removeFromColumn(instegramUsers, 'followers', logdinUserId.toString(), itemId)
        await dbService.removeFromColumn(instegramUsers, 'following', itemId, logdinUserId.toString())
    } catch (err) {
        logger.error('follow service - cannot remove from column' + err)
        res.status(401).send({ err: `Failed to remove from column ${err}` })
    }
}