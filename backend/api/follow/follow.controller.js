const logger = require('../../services/logger.service')
const followService = require('./follow.service')
const authService = require('../auth/auth.service')
const bcrypt = require('bcrypt')

async function addFollow(req, res) {
    const { userId } = req.params
    const loggedinUser = authService.validateToken(req.cookies.loginToken)
    try {
        await followService.appendToColumn(userId, loggedinUser._id)
        await authService.updateLoginToken(loggedinUser, res)
        res.status(200).send(true)
    } catch (err) {
        logger.error('follow controller - cannot append to column' + err)
        res.status(401).send({ err: `Failed to append to column ${err}` })
    }
}

async function removeFollow(req, res) {
    const { userId } = req.params
    const loggedinUser = authService.validateToken(req.cookies.loginToken)
    try {
        await followService.removeFromColumn(userId, loggedinUser._id)
        await authService.updateLoginToken(loggedinUser, res)
        res.status(200).send(true)
    } catch (error) {
        logger.error('follow controller - cannot remove from column' + error)
        res.status(401).send({ err: `Failed to remove from column ${error}` })
    }
}

async function isFollowing(req, res) {
    const { userId } = req.params
    const loggedinUser = await authService.validateToken(req.cookies.loginToken)
    try {
        let isFollowing = await followService.checkIsFollowing(userId, loggedinUser._id)
        res.send(isFollowing)
    } catch (error) {
        logger.error('follow controller - failed to check if following' + error)
        res.status(401).send({ err: `Failed to check if following ${error}` })
    }
}

module.exports = {
    addFollow,
    removeFollow,
    isFollowing
}