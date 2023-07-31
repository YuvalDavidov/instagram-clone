const Cryptr = require('cryptr')
const logger = require('../services/logger.service')
const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')




async function sendLoginToken(user, res) {
    let newUser
    try {
        newUser = { ...user }
        let loginToken = cryptr.encrypt(JSON.stringify(newUser))
        res.clearCookie('loginToken')
        res.cookie('loginToken', loginToken, { sameSite: 'None', secure: true, maxAge: 604800000 }) // 604800000 is a week
        return true
    } catch (error) {
        logger.error(`auth.service - cant send loginToken`)
        throw new Error('auth.service - cant send loginToken', error)
    }

}
async function validateToken(loginToken) {
    try {
        const loggedinUser = await JSON.parse(cryptr.decrypt(loginToken))
        return loggedinUser

    } catch (err) {
        throw new Error('Invalid login token')
    }
}


module.exports = {
    sendLoginToken,
    validateToken
}