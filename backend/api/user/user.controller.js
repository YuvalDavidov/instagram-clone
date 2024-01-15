const userService = require('./user.service')
// const socketService = require('../../services/socket.service')
const logger = require('../../services/logger.service')
const tokenService = require('../../services/token.service')

async function getUser(req, res) {
    try {
        const loggedInUserId = await addToViewCount(req, res)
        const user = (loggedInUserId === req.params.userId) ?
            await userService.getById(req.params.userId, ['_id', 'fullname', 'username', 'imgUrl', 'following', 'followers', 'bio', 'numOfPosts', 'vipProfiles'])
            :
            await userService.getById(req.params.userId, ['_id', 'fullname', 'username', 'imgUrl', 'following', 'followers', 'bio', 'numOfPosts'])
        res.send(user)
    } catch (err) {
        logger.error('Failed to get user', err)
        res.status(500).send({ err: 'Failed to get user' })
    }
}

async function getUsers(req, res) {
    try {
        const loggedinUser = await tokenService.validateToken(req.cookies.loginToken)
        const filterBy = {
            username: req.query.filterBy || '',
            fullname: req.query.filterBy || ''
        }
        const isLessDetails = Boolean(req.query.isLessDetails)
        const users = (req.query?.isLessDetails) ? await userService.query(filterBy, isLessDetails, loggedinUser._id) : await userService.query(filterBy)
        res.send(users)
    } catch (err) {
        logger.error('Failed to get users', err)
        res.status(500).send({ err: 'Failed to get users' })
    }
}

async function deleteUser(req, res) {
    try {
        await userService.remove(req.params.userId)
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
    } catch (error) {
        logger.error('Failed to update user', error)
        res.status(500).send({ error: 'Failed to update user' + error })
    }
}

async function updatePassword(req, res) {
    const { userId, currPassword, newPassword } = req.body
    try {
        await userService.checkPassword(userId, currPassword)
        const encryptedPassword = await userService.encryptPassword(newPassword)
        await userService.update({ _id: userId, password: encryptedPassword })
        res.status(200).send(true)
    } catch (error) {
        logger.error('Failed to update password', error)
        res.status(500).send({ error: 'Failed to update password' })
    }
}

async function addToViewCount(req, res) {
    // when this function called that means that the loggedin user has visited this user at least 5 times in the time frame that was designated 
    const { userId } = req.params
    try {
        let loggedinUserFromCookie = await tokenService.validateToken(req.cookies.loginToken)
        if (loggedinUserFromCookie._id === userId) return loggedinUserFromCookie._id
        await userService.addToViewCount(userId, loggedinUserFromCookie, res)
        return loggedinUserFromCookie._id
    } catch (error) {
        logger.error('Failed to add to view count', err)
    }
}

module.exports = {
    getUser,
    getUsers,
    deleteUser,
    updateUser,
    updatePassword,
    addToViewCount
}