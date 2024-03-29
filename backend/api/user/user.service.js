
const utilService = require('../../services/util.service')
const dbService = require('../../services/db.service')
const storyService = require('../story/story.service')
const logger = require('../../services/logger.service')
const { picgramUsers, picgramPosts, picgramStories } = require('../../services/models/models')
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
                await dbService.appendToColumn(picgramUsers, userId, 'vipProfiles', loggedinUserFromCookie._id)
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
        let model = (isLessDetails) ? await dbService.query(picgramUsers, filterBy, 10, isLessDetails) : await dbService.query(picgramUsers, filterBy)
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
        let user = await dbService.queryOne(picgramUsers, { _id: userId }, attributes)
        return user
    }
    catch (err) {
        logger.error(`user.service - while finding user by id: ${userId}`, err)
        throw err
    }
}
async function getByUsername(username, attributes) {
    try {
        let user = await dbService.queryOne(picgramUsers, { username }, attributes)
        return user
    } catch (err) {
        logger.error(`user.service - while finding user by username: ${username}`, err)
        throw err
    }
}

// remove()
async function remove(userId) {
    try {
        await dbService.removeRecord(picgramUsers, userId)
    } catch (err) {
        logger.error(`user.service - cannot remove user ${userId}`, err)
        throw err
    }
}

async function update(user) {
    try {
        let updatedUser = await dbService.updateRecord(picgramUsers, user, user._id)
        if (user.imgUrl) {
            for (let index = 0; index < updatedUser.dataValues.numOfPosts; index++) {
                await dbService.updateRecord(picgramPosts, { userImg: user.imgUrl }, user._id, 'userId')
            }
        }
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
        let addedUser = await dbService.addRecord(picgramUsers, user)
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


// async function specialUpdateScript(userId) {
//     let user = await dbService.queryOne(picgramUsers, { _id: userId })
//     let stories = await storyService.query(userId, condition = 'userId')
//     console.log('=====>', stories, 'img:', user.imgUrl)
//     for (let i = 0; i < stories.length; i++) {
//         let story = await storyService.query(stories[i], condition = 'storyId')
//         await dbService.updateRecord(picgramStories, { userInfo: { userId, username: user.username, userImgUrl: user.imgUrl } }, story._id)

//     }

//     // for (let index = 0; index < user.numOfPosts; index++) {
//     //     await dbService.updateRecord(picgramPosts, { username: user.username }, user._id, 'userId')
//     // }
//     // user = { ...user, username: 'roni1', fullname: 'Roni Sherman' }
//     // await dbService.updateRecord(picgramUsers, user, user._id)

// }

// specialUpdateScript('2879169354')