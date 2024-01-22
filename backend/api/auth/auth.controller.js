const tokenService = require('../../services/token.service')
const logger = require('../../services/logger.service')
const authService = require('../auth/auth.service')
require('dotenv').config()


async function login(req, res) {
    const { username, password } = req.body
    try {
        const user = await authService.login(username, password)
        await tokenService.sendLoginToken(user, res)
        res.json(user)
    } catch (err) {
        logger.error('Failed to Login ' + err)
        res.status(401).send({ err: `Failed to Login ${err}` })
    }
}
async function loginDummy(req, res) {
    try {
        const user = await authService.login(process.env.DUMMY_USERNAME, process.env.DUMMY_PASSWORD)
        await tokenService.sendLoginToken(user, res)
        res.json(user)
    } catch (err) {
        logger.error('Failed to Login ' + err)
        res.status(401).send({ err: `Failed to Login ${err}` })
    }
}

async function signup(req, res) {
    try {
        const credentials = req.body
        // Never log passwords
        // logger.debug(credentials)
        const account = await authService.signup(credentials)
        logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
        const user = await authService.login(credentials.username, credentials.password)
        logger.info('User signup:', user)
        await tokenService.sendLoginToken(user, res)
        res.json(user)
    } catch (err) {
        logger.error('Failed to signup ' + err)
        res.status(500).send({ err: 'Failed to signup' })
    }
}

async function logout(req, res) {
    try {
        res.clearCookie('loginToken')
        res.send({ msg: 'Logged out successfully' })
    } catch (err) {
        res.status(500).send({ err: 'Failed to logout' })
    }
}

module.exports = {
    login,
    loginDummy,
    signup,
    logout
}