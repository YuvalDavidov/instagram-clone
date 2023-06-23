const logger = require('../../services/logger.service')
const followService = require('./follow.service')
const authService = require('../auth/auth.service')
const bcrypt = require('bcrypt')

async function addFollow(req, res) {
    const { _id } = req.params
    const loggedinUser = authService.getLoggedinUser(req)
    try {
        await followService.appendToColumn(_id, loggedinUser._id, res)
        const user = await authService.updateLoginToken(loggedinUser, res)
        res.json(user)

    } catch (err) {
        logger.error('follow controller - cannot append to column' + err)
        res.status(401).send({ err: `Failed to append to column ${err}` })
    }
}

async function removeFollow(req, res) {
    const { _id } = req.params
    const loggedinUser = authService.getLoggedinUser(req)
    try {
        await followService.removeFromColumn(_id, loggedinUser._id, res)
        const user = await authService.updateLoginToken(loggedinUser, res)
        res.json(user)

    } catch (err) {
        logger.error('follow controller - cannot remove from column' + err)
        res.status(401).send({ err: `Failed to remove from column ${err}` })
    }
}

module.exports = {
    addFollow,
    removeFollow
}