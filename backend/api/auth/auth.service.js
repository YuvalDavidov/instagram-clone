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
    encrypt
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
        throw new Error('auth.service - Invalid username or password', err)
    }

}


async function signup({ username, password, fullname, args }) {
    logger.debug(`auth.service - signup with username: ${username}, fullname: ${fullname}`)
    if (!username || !password || !fullname) return new Error('Missing required signup information')
    try {
        const userExist = await userService.getByUsername(username)
        if (userExist) return new Error('Username already taken')
        const hash = await bcrypt.hash(password, saltRounds)
        return await userService.add({ username, password: hash, fullname, ...args })
    } catch (error) {
        throw new Error(`coudlnt sign-up`, error)
    }


}


function getLoginToken(user) {
    const userInfo = { _id: user._id, fullname: user.fullname, isAdmin: user.isAdmin }
    return cryptr.encrypt(JSON.stringify(userInfo))
}

function validateToken(loginToken) {
    try {
        const json = cryptr.decrypt(loginToken)
        const loggedinUser = JSON.parse(json)
        return loggedinUser

    } catch (err) {
        throw new Error('Invalid login token')
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