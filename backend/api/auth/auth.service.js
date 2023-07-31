const Cryptr = require('cryptr')
const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')
const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')
const saltRounds = 10





async function login(username, password) {
    logger.debug(`auth.service - login with username: ${username}`)
    try {
        const user = await userService.getByUsername(username, ['_id', 'fullname', 'password', 'username', 'imgUrl', 'following', 'followers', 'bio', 'numOfPosts', 'vipProfiles'])
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



module.exports = {
    signup,
    login,

}


// ;(async ()=>{
//     await signup('bubu', '123', 'Bubu Bi')
//     await signup('mumu', '123', 'Mumu Maha')
// })()