
const utilService = require('../../services/util.service')
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const { instegramUsers } = require('../../services/models/models')
const tokenService = require('../../services/token.service')



module.exports = {
    query,
    getById,
    getByUsername,
    remove,
    update,
    add,
    checkPassword,
    encryptPassword,
    addToViewCount,
    validatePassword,
    encrypt,
}


async function addToViewCount(userId, loggedinUserFromCookie, res) {
    try {
        let profileIdx = loggedinUserFromCookie.vipProfiles.findIndex(profile => profile.userId === userId)
        let { vipProfiles } = await getById(loggedinUserFromCookie._id, ['vipProfiles'])
        if (vipProfiles.includes(userId)) {
            loggedinUserFromCookie.vipProfiles.splice(profileIdx, 1)
            await tokenService.sendLoginToken(loggedinUserFromCookie, res)
            return
        }
        if (profileIdx >= 0) {
            loggedinUserFromCookie.vipProfiles[profileIdx].numOfVisits += 1
            await tokenService.sendLoginToken(loggedinUserFromCookie, res)
            if (loggedinUserFromCookie.vipProfiles[profileIdx].numOfVisits >= 5) {
                await dbService.appendToColumn(instegramUsers, userId, 'vipProfiles', loggedinUserFromCookie._id)
            }
            return true
        } else {
            loggedinUserFromCookie.vipProfiles.push({ userId: userId, numOfVisits: 1 })
            await tokenService.sendLoginToken(loggedinUserFromCookie, res)
            return false
        }

    } catch (error) {
        console.log(error)
        throw new Error('', error)
    }
}

async function query(filterBy = { username: '' }, isLessDetails = false, loggedinUserId) {
    try {
        let model = (isLessDetails) ? await dbService.query(instegramUsers, filterBy, 10, isLessDetails) : await dbService.query(instegramUsers, filterBy)
        let filterdUsers = model.map(user => {
            delete user.password
            return user
        }).filter(u => u._id !== loggedinUserId)
        return filterdUsers
    } catch (err) {
        logger.error('user.service - cannot find users', err)
        throw err
    }
}

async function getById(userId, attributes) {
    try {
        let user = await dbService.queryOne(instegramUsers, { _id: userId }, attributes)
        return user
    }
    catch (err) {
        logger.error(`user.service - while finding user by id: ${userId}`, err)
        throw err
    }
}
async function getByUsername(username, attributes) {
    try {
        let user = await dbService.queryOne(instegramUsers, { username }, attributes)
        return user
    } catch (err) {
        logger.error(`user.service - while finding user by username: ${username}`, err)
        throw err
    }
}

// remove()
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
    const _id = utilService.makeId(10)
    user = {
        ...user,
        _id
    }
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
        await validatePassword(userId, password)
    } catch (error) {
        logger.error('user.service - password incorrect')
        throw error
    }
}

async function encryptPassword(password) {
    try {
        await encrypt(password)
    } catch (error) {
        logger.error('user.service - couldn\'t encrypt password')
        throw error
    }
}


async function validatePassword(userId, password) {

    try {
        const user = await userService.getById(userId)
        await bcrypt.compare(password, user.password)

    } catch (error) {
        throw new Error('Incorrect Password')
    }
}

async function encrypt(password) {

    try {
        const hash = await bcrypt.hash(password, saltRounds)
        return hash
    } catch (error) {
        throw new Error('couldn\'t encrypt password')
    }
}


