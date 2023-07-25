const Cryptr = require('cryptr')
const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')
const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')
const saltRounds = 10

module.exports = {
    signup,
    login,
    getLoginToken,
    validateToken,
    validatePassword,
    encrypt,
    updateLoginToken
}

async function updateLoginToken(user, res) {
    try {
        const newUser = await userService.getById(user._id, ['_id', 'fullname', 'username', 'imgUrl', 'following', 'followers', 'bio', 'numOfPosts', 'vipProfiles'])
        const loginToken = getLoginToken(newUser)
        res.clearCookie('loginToken')
        res.cookie('loginToken', loginToken, { sameSite: 'None', secure: true })

    } catch (error) {
        logger.error(`auth.service - cant update loginToken`)
        throw new Error('auth.service - cant update loginToken', error)
    }

}

async function login(username, password) {
    logger.debug(`auth.service - login with username: ${username}`)
    try {
        const user = await userService.getByUsername(username, ['_id', 'fullname', 'username', 'imgUrl', 'following', 'followers', 'bio', 'numOfPosts', 'vipProfiles'])
        await bcrypt.compare(password, user.password)
        delete user.password
        return user
    } catch (error) {
        logger.error(`auth.service - Invalid username or password`)
        throw new Error('auth.service - Invalid username or password', error)
    }

}

async function signup({ username, password, fullname, ...args }) {
    let userExist
    logger.debug(`auth.service - signup with username: ${username}, fullname: ${fullname}`)
    if (!username || !password || !fullname) return new Error('Missing required signup information')
    try {
        userExist = await userService.getByUsername(username)
        if (userExist) throw new Error('Username already taken')
        const hash = await bcrypt.hash(password, saltRounds)
        return await userService.add({ username, password: hash, fullname, ...args })
    } catch (error) {
        throw new Error(`coudlnt sign-up`, error)
    }


}


async function getLoginToken(user) {
    let newUser
    if (typeof user === 'string') newUser = await userService.getById(user._id, ['_id', 'fullname', 'username', 'imgUrl', 'following', 'followers', 'bio', 'numOfPosts', 'vipProfiles'])
    else newUser = { ...user }
    return cryptr.encrypt(JSON.stringify(newUser))
}

async function validateToken(loginToken) {
    try {
        const loggedinUser = await JSON.parse(cryptr.decrypt(loginToken))
        return loggedinUser

    } catch (err) {
        throw new Error('Invalid login token', err)
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




// ;(async ()=>{
//     await signup('bubu', '123', 'Bubu Bi')
//     await signup('mumu', '123', 'Mumu Maha')
// })()