
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const { instegramUsers } = require('../../services/models/models')
const authService = require('../auth/auth.service')

module.exports = {
    query,
    getById,
    getByUsername,
    remove,
    update,
    add,
    checkPassword,
    encryptPassword
}

async function query(filterBy = { username: '' }, isLessDetails = false, loggedinUser) {
    try {
        let model = (isLessDetails) ? await dbService.query(instegramUsers, filterBy, 10, isLessDetails) : await dbService.query(instegramUsers, filterBy)
        let filterdUsers = model.map(user => {
            delete user.password
            return user
        }).filter(u => u._id !== loggedinUser._id)
        return filterdUsers
    } catch (err) {
        logger.error('user.service - cannot find users', err)
        throw err
    }
}

async function getById(userId) {
    try {
        let user = await dbService.queryOne(instegramUsers, { _id: userId })
        delete user.password
        return user
    }
    catch (err) {
        logger.error(`user.service - while finding user by id: ${userId}`, err)
        throw err
    }
}
async function getByUsername(username) {
    try {
        let user = await dbService.queryOne(instegramUsers, { username })
        return user
    } catch (err) {
        logger.error(`user.service - while finding user by username: ${username}`, err)
        throw err
    }
}

async function remove(userId) {
    try {
        await dbService.removeRecord(instegramUsers, userId)
    } catch (err) {
        logger.error(`user.service - cannot remove user ${userId}`, err)
        throw err
    }
}

async function update(user) {
    try {
        let updatedUser = await dbService.updateRecord(instegramUsers, user, user._id)
        return updatedUser
    } catch (err) {
        logger.error(`user.service - cannot update user ${user._id}`, err)
        throw err
    }
}

async function add(user) {
    try {
        let addedUser = await dbService.addRecord(instegramUsers, user)
        return addedUser
    } catch (err) {
        logger.error('user.service - cannot add user', err)
        throw err
    }
}


async function checkPassword(userId, password) {
    try {
        await authService.validatePassword(userId, password)
    } catch (error) {
        logger.error('user.service - password incorrect')
        throw error
    }
}

async function encryptPassword(password) {
    try {
        await authService.encrypt(password)
    } catch (error) {
        logger.error('user.service - couldn\'t encrypt password')
        throw error
    }
}


