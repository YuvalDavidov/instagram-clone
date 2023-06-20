const logger = require('../../services/logger.service')
const followService = require('./follow.service')
const bcrypt = require('bcrypt')

async function addFollow(req, res) {
    const { _id } = req.params
    const { user } = bcrypt(req.cookies.loginUser)
    try {
        await followService.appendToColumn(_id, user._id)
    } catch (err) {
        logger.error('follow controller - cannot append to column' + err)
        res.status(401).send({ err: `Failed to append to column ${err}` })
    }
}

async function removeFollow(req, res) {
    const { _id } = req.params
    const { user } = bcrypt(req.cookies.loginUser)
    try {
        await followService.removeFromColumn(_id, user)
    } catch (error) {
        logger.error('follow controller - cannot remove from column' + err)
        res.status(401).send({ err: `Failed to remove from column ${err}` })
    }
}

module.exports = {
    addFollow,
    removeFollow
}