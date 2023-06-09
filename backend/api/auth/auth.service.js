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
    getLoggedinUser,
    updateLoginToken
}

async function updateLoginToken(user, res) {
    try {
        const newUser = await userService.getById(user._id)
        const loginToken = getLoginToken(newUser)
        res.clearCookie('loginToken')
        res.cookie('loginToken', loginToken, { sameSite: 'None', secure: true })
        res.json(newUser)

    } catch (error) {
        logger.error(`auth.service - cant update loginToken`)
        throw new Error('auth.service - cant update loginToken', error)
    }

}

async function login(username, password) {
    logger.debug(`auth.service - login with username: ${username}`)
    try {
        const user = await userService.getByUsername(username)
        await bcrypt.compare(password, user.password)
        delete user.password
        user._id = user._id.toString()
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

function getLoggedinUser(req) {
    const loginToken = req.cookies.loginToken
    const loggedinUser = JSON.parse(cryptr.decrypt(loginToken))
    return loggedinUser
}

function getLoginToken(user) {
    const userInfo = { _id: user._id, fullname: user.fullname, username: user.username, urlImg: user.urlImg }
    return cryptr.encrypt(JSON.stringify(userInfo))
}

function validateToken(loginToken) {
    try {
        const json = cryptr.decrypt(loginToken)
        const loggedinUser = JSON.parse(json)
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