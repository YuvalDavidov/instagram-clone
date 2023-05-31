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

const BASE_URL = 'user/'
const USER_KEY = 'UserDB'
const STORAGE_KEY_LOGGEDIN_USER = 'UserS'

async function query(filterBy) {
    try {
        const loggedinUserId = getLoggedinUser()._id
        // const queryParams = `?username=${filterBy.username}&fullname=${filterBy.fullname}?isLessDetails=${true}`
        // let users = await httpService.get(BASE_URL+ queryParams)
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
        // console.log(users)
        users = users.filter(user => user.username.includes(filterBy))
        // console.log(users)
        // users = users.splice(0, 5)
        return users
    } catch (error) {
        throw new Error('coudnlt preform search query', error)

    }

}



async function changePassword(currPassword, newPassword, userId) {
    let user = getUserById(userId)

}



async function updateUser(updatedUser) {
    await storageService.put(USER_KEY, updatedUser)
    saveLocalUser(updatedUser)
}

async function updatePassword(userId, currPassword, newPassword) {
    // const newCredentials = {userId, currPassword, newPassword}
    // await httpService.put(`${USER_URL}+password`, newCredentials)

}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getUserById(userId) {
    return storageService.get(USER_KEY, userId)
}

function checkIfOwnByUser(id) {
    let currUser = getLoggedinUser()
    if (currUser._id === id) return true
    else return false
}


function logout() {
    sessionStorage.clear()
}

async function login(userCred) {
    try {
        const users = await storageService.query(USER_KEY)
        const user = users.find(user => user.username === userCred.username)
        if (user) {
            // // const user = await httpService.post('auth/login', userCred)
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
    if (!userCred.imgUrl) userCred.imgUrl = 'http://res.cloudinary.com/dp32ucj0y/image/upload/v1684499340/flz2v8jhwu9z7irwiy06.png'
    let newUser = ({
        ...userCred,
        followers: [],
        following: [],
        summery: '',
        highelights: [],
        stories: [],
        darkMode: true
    })

    try {
        const user = await storageService.post(USER_KEY, newUser)
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
