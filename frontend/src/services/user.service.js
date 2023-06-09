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
    updatePassword,
    updateLoginUser
}

const USER_URL = 'user/'
const AUTH_URL = 'auth/'
const USER_KEY = 'UserDB'
const STORAGE_KEY_LOGGEDIN_USER = 'loginToken'

async function query(filterBy) {
    try {
        console.log('filterBy---->', filterBy)
        const queryParams = `?filterBy=${filterBy}&isLessDetails=${true}`
        const users = await httpService.get(USER_URL + queryParams)
        return users
    } catch (error) {
        throw new Error('coudnlt preform search query', error)

    }

}


async function updateUser(updatedDetails) {
    const updatedUser = await httpService.put(`${USER_URL}${updatedDetails._id}`, updatedDetails)
    // await storageService.put(USER_KEY, updatedUser)
    saveLocalUser(updatedUser)
}

async function updatePassword(userId, currPassword, newPassword) {
    // const newCredentials = {userId, currPassword, newPassword}
    await httpService.put(`${USER_URL}password`, newCredentials)

}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

async function getUserById(userId) {
    // return storageService.get(USER_KEY, userId)
    try {
        const user = await httpService.get(USER_URL + userId)
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
}

function updateLoginUser(user) {
    sessionStorage.clear()
    return saveLocalUser(user)
}

async function login(userCred) {
    try {
        const user = await httpService.post(AUTH_URL + 'login', userCred)
        return saveLocalUser(user)
        // const users = await storageService.query(USER_KEY)
        // const user = users.find(user => user.username === userCred.username)
        // if (user) {
        //     // // const user = await httpService.post('auth/login', userCred)
        //     //     socketService.login(user._id)
        //     return saveLocalUser(user)
        // } else throw new Error('couldnt find username')
    } catch (err) {
        throw new Error('coudnlt preform query', err)
    }

}

function saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
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
        return saveLocalUser(user)
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
