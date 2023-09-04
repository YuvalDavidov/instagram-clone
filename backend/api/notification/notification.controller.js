const logger = require('../../services/logger.service')
const tokenService = require('../../services/token.service')
const notificationsService = require('./notification.service.js');

async function getUserUnsawNotifications(req, res) {
    try {
        const unsawNotifications = await notificationsService.query('s', 'd')
        res.json('unsawNotifications')
    } catch (error) {
        logger.error('notification controller - cannot get unsaw notification' + err)
        res.status(401).send({ err: `Failed to get unsaw notification ${err}` })
    }
}

module.exports = {
    getUserUnsawNotifications
}