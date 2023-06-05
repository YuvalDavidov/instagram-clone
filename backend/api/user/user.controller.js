const userService = require('./user.service')
const socketService = require('../../services/socket.service')
const logger = require('../../services/logger.service')

async function getUser(req, res) {
    try {
        const user = await userService.getById(req.params._id)
        res.send(user)
    } catch (err) {
        logger.error('Failed to get user', err)
        res.status(500).send({ err: 'Failed to get user' })
    }
}

async function getUsers(req, res) {
    try {
        const filterBy = {
            username: req.query?.username || '',
            fullname: req.query?.fullname || ''
        }
        const users = (req.query?.isLessDetails) ? await userService.query(filterBy, req.query.isLessDetails) : await userService.query(filterBy)
        res.send(users)
    } catch (err) {
        logger.error('Failed to get users', err)
        res.status(500).send({ err: 'Failed to get users' })
    }
}

async function deleteUser(req, res) {
    try {
        await userService.remove(req.params._id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete user', err)
        res.status(500).send({ err: 'Failed to delete user' })
    }
}

async function updateUser(req, res) {
    try {
        const user = req.body
        const savedUser = await userService.update(user)
        res.send(savedUser)
    } catch (err) {
        logger.error('Failed to update user', err)
        res.status(500).send({ err: 'Failed to update user' })
    }
}

async function updatePassword(req, res) {
    const { userId, currPassword, newPassword } = req.body
    try {
        await userService.checkPassword(userId, currPassword)
        const encryptedPassword = await userService.encryptPassword(newPassword)
        await userService.update({ _id: userId, password: encryptedPassword })
    } catch (error) {
        logger.error('Failed to update password', err)
        res.status(500).send({ err: 'Failed to update password' })
    }
}

module.exports = {
    getUser,
    getUsers,
    deleteUser,
    updateUser,
    updatePassword
}