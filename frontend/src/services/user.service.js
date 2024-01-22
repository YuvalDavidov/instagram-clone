import { storageService } from './async-storage.service'
import { httpService } from './http.service.js'
import { socketService } from './socket.service'
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
    updatePassword,
    updateSessionStorage,
    getVipProfile
}

const USER_URL = 'user/'
const AUTH_URL = 'auth/'
const USER_KEY = 'UserDB'
const STORAGE_KEY_LOGGEDIN_USER = 'loginToken'

async function query(filterBy) {
    try {
        const queryParams = `?filterBy=${filterBy}&isLessDetails=${true}`
        const users = await httpService.get(USER_URL + queryParams)
        return users
    } catch (error) {
        throw new Error('coudnlt preform search query', error)

    }

}


async function updateUser(updatedDetails) {
    const updatedUser = await httpService.put(`${USER_URL}${updatedDetails._id}`, updatedDetails)
    saveLocalUser(updatedUser)
    return updatedUser
    // await storageService.put(USER_KEY, updatedUser)
}

async function updatePassword(userId, currPassword, newPassword) {
    try {
        const newCredentials = { userId, currPassword, newPassword }
        await httpService.put(`${USER_URL}password`, newCredentials)
        return true
    } catch (error) {
        throw new Error(error)
        return false
    }

}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

async function getUserById(userId) {
    try {
        let user = getVipProfile(userId)
        if (user) return user
        else user = await httpService.get(USER_URL + userId)
        return user
    } catch (error) {
        throw new Error('coudnlt get this user', error)

    }

}

function checkIfOwnByUser(id) {
    let currUser = getLoggedinUser()
    if (currUser._id === id) return true
    else return false
}


function logout() {
    sessionStorage.clear()
    socketService.logout()
    httpService.post(AUTH_URL + 'logout')
}

function updateSessionStorage(user, profile) {
    if (profile) saveVipProfile(profile)
    return saveLocalUser(user)
}

async function login(userCred) {
    try {
        let vipProfile
        let user
        if (!userCred) user = await httpService.post(AUTH_URL + 'login/dummy',)
        else user = await httpService.post(AUTH_URL + 'login', userCred)
        socketService.login(user._id)
        if (user.vipProfiles.length) {
            user.vipProfiles.forEach(async (profileId) => {
                vipProfile = await httpService.get(USER_URL + profileId)
                saveVipProfile(vipProfile)
            })

            return saveLocalUser(user)
        }
    } catch (err) {
        throw new Error('coudnlt preform query', err)
    }

}

function saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function saveVipProfile(user) {
    sessionStorage.setItem(user._id, JSON.stringify(user))
    return user
}

function getVipProfile(profileId) {
    return JSON.parse(sessionStorage.getItem(profileId))
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'http://res.cloudinary.com/dp32ucj0y/image/upload/v1684499340/flz2v8jhwu9z7irwiy06.png'
    let newUser = ({
        ...userCred,
        followers: [],
        following: [],
        bio: '',
        highlights: [],
        stories: [],
        // darkMode: true
    })

    try {
        // const user = await storageService.post(USER_KEY, newUser)
        const user = await httpService.post(AUTH_URL + 'signup', newUser)
        // socketService.login(user._id)
        saveLocalUser(user)
        return user
    } catch (err) {
        throw new Error('coudnt post new user', err)
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
