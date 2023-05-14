
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')

module.exports = {
    query,
    getById,
    getByUsername,
    remove,
    update,
    add
}

async function query(filterBy = { username: '' }) {
    try {
        let model = await dbService.query(users, filterBy)
        let filterdUsers = model.map(user => {
            delete user.password
            return user
        })
        return filterdUsers
    } catch (err) {
        logger.error('user.service - cannot find users', err)
        throw err
    }
}


async function getById(userId) {
    try {
        let user = await dbService.query(users, { _id: userId })
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
        let user = await dbService.query(users, { username })
        delete user.password
        return user
    } catch (err) {
        logger.error(`user.service - while finding user by username: ${username}`, err)
        throw err
    }
}

async function remove(userId) {
    try {
        await dbService.removeRecord(users, userId)
    } catch (err) {
        logger.error(`user.service - cannot remove user ${userId}`, err)
        throw err
    }
}

async function update(user) {
    try {
        let updatedUser = await dbService.updateRecord(users, user, user._id)
        return updatedUser
    } catch (err) {
        logger.error(`user.service - cannot update user ${user._id}`, err)
        throw err
    }
}

async function add(user) {
    try {
        let addedUser = await dbService.addRecord(users, user)
        return addedUser
    } catch (err) {
        logger.error('user.service - cannot add user', err)
        throw err
    }
}



