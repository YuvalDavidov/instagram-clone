import { storageService } from './async-storage.service'
import { httpService } from './http.service.js'
export const userService = {
    getUserById,
    getLoggedinUser,
    login,
    logout,
    getEmptyUser,
    signup,
    updateUser,
    saveLocalUser,
    checkIfOwnByUser,
    query,
    updatePassword
}

const USER_URL = 'user/'
const AUTH_URL = 'auth/'
const USER_KEY = 'UserDB'
const STORAGE_KEY_LOGGEDIN_USER = 'UserS'

async function query(filterBy) {
    try {
        const loggedinUserId = getLoggedinUser()._id
        // const queryParams = `?username=${filterBy.username}&fullname=${filterBy.fullname}?isLessDetails=${true}`
        // let users = await httpService.get(USER_URL+ queryParams)
        let users = await storageService.query(USER_KEY)
        users = users.map(user => {
            return {
                username: user.username,
                userId: user._id,
                imgUrl: user.imgUrl,
                fullname: user.fullname
            }
        })
        users = users.filter(user => user.userId !== loggedinUserId && (user.username.includes(filterBy) || user.fullname.includes(filterBy)))
        return users
    } catch (error) {
        throw new Error('coudnlt preform search query - user service', error)

    }

}



async function updateUser(updatedUser) {
    try {
        // await httpService.put(USER_URL, updatedUser)
        await storageService.put(USER_KEY, updatedUser)
        saveLocalUser(updatedUser)

    } catch (error) {
        throw new Error('coudnlt update user - user service', error)
    }
}

async function updatePassword(userId, currPassword, newPassword) {
    // const newCredentials = {userId, currPassword, newPassword}
    // await httpService.put(`${USER_URL}+password`, newCredentials)

}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

async function getUserById(userId) {
    try {
        // return await httpService.get(USER_URL + `:${userId}`)
        return storageService.get(USER_KEY, userId)

    } catch (error) {
        throw new Error('coudnlt get user - user service', error)
    }
}

function checkIfOwnByUser(id) {
    let currUser = getLoggedinUser()
    if (currUser._id === id) return true
    else return false
}


async function logout() {
    try {
        await httpService.post(AUTH_URL + 'logout')
        sessionStorage.clear()
    } catch (error) {
        throw new Error('coudnlt preform logout - user service', error)
    }

}

async function login(userCred) {
    try {
        // const user = await httpService.post(`${AUTH_URL}login`, userCred)
        const users = await storageService.query(USER_KEY)
        const user = users.find(user => user.username === userCred.username)
        if (user) {
            //     socketService.login(user._id)
            return saveLocalUser(user)
        } else throw new Error('couldnt find username')
    } catch (err) {
        throw new Error('coudnlt preform query', err)
    }

}

function saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcSgdMa3-zfBbsMOTEYwMDhWumoaLYOb4kbOBP9Mmwdt9AwdzYCaL0VS1zKzlKc5DnPoWUSfVA25uggiN0o'
    userCred = ({
        ...userCred,
        followers: [],
        following: [],
        summery: '',
        highelights: [],
        stories: [],
    })

    try {
        const user = await storageService.post(USER_KEY, userCred)
        // const user = await httpService.post('auth/signup', userCred)
        // socketService.login(user._id)
        saveLocalUser(user)
        return user
    } catch (err) {
        throw new Error(err, 'coudnt post new user')
    }

}

function getEmptyUser() {
    return { fullname: '', username: '', password: '' }
}

// ; (async () => {
//     // await signup({ fullname: 'Puki Norma', username: 'yuval1', password: '12345' })
//     // await signup({ fullname: 'Master Adminov', username: 'shaked', password: '12345' })
//     // await signup({ fullname: 'Muki G', username: 'daniel', password: '12345' })
//     await signup({ fullname: 'Muki Gsa', username: 'noa', password: '12345' })
// })()
