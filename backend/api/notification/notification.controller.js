const logger = require('../../services/logger.service')
const tokenService = require('../../services/token.service')
const notificationsService = require('./notification.service.js');

async function getUserUnsawNotifications(req, res) {
    try {
        const loggedinUser = await tokenService.validateToken(req.cookies.loginToken)
        const unsawNotifications = await notificationsService.query('unsaw', loggedinUser._id)
        res.json(unsawNotifications)
    } catch (error) {
        logger.error('notification controller - cannot get unsaw notification' + error)
        res.status(401).send({ error: `Failed to get unsaw notification ${error}` })
    }
}

async function getUserNotifications(req, res) {
    try {
        const loggedinUser = await tokenService.validateToken(req.cookies.loginToken)
        const notifications = await notificationsService.query('all', loggedinUser._id)
        res.json(notifications)
    } catch (error) {
        logger.error('notification controller - cannot get notification' + error)
        res.status(401).send({ error: `Failed to get notification ${error}` })
    }
}

module.exports = {
    getUserUnsawNotifications,
    getUserNotifications
}