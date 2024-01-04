const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')

const { picgramUsers } = require('../../services/models/models')

module.exports = {
    appendToColumn,
    removeFromColumn,
    checkIsFollowing
}

async function checkIsFollowing(userId, loggedinUserId) {
    try {
        let isFollowing = await dbService.queryOne(picgramUsers, { _id: loggedinUserId, following: [userId] }, ['_id'])
        if (isFollowing) return true
        else return false
    } catch (error) {
        logger.error('follow service - Couldnt check if following' + err)
        throw new Error(`follow service - Couldnt check if following`)
    }
}

async function appendToColumn(itemId, logdinUserId) {
    try {
        await dbService.appendToColumn(picgramUsers, logdinUserId.toString(), 'followers', itemId)
        await dbService.appendToColumn(picgramUsers, itemId, 'following', logdinUserId.toString())

    } catch (err) {
        logger.error('follow service - cannot append to column' + err)
        throw new Error(`follow service - Failed to append to column ${err}`)
    }
}

async function removeFromColumn(itemId, logdinUserId) {
    try {
        await dbService.removeFromColumn(picgramUsers, 'followers', logdinUserId.toString(), itemId)
        await dbService.removeFromColumn(picgramUsers, 'following', itemId, logdinUserId.toString())
    } catch (err) {
        logger.error('follow service - cannot remove from column' + err)
        throw new Error(`follow service - Failed to remove from column ${err}`)
    }
}