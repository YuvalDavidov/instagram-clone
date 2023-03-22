import { storageService } from './async-storage.service'

export const userService = {
    getUserById,
    getLoggedinUser,
    login,
    logout,
    getEmptyUser,
    signup,
    saveLocalUser,
    checkIfOwnProfile
}
const USER_KEY = 'UserDB'
const STORAGE_KEY_LOGGEDIN_USER = 'UserS'

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getUserById(userId) {
    return storageService.get(USER_KEY, userId)
}

function checkIfOwnProfile(id) {
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
    if (!userCred.imgUrl) userCred.imgUrl = 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcSgdMa3-zfBbsMOTEYwMDhWumoaLYOb4kbOBP9Mmwdt9AwdzYCaL0VS1zKzlKc5DnPoWUSfVA25uggiN0o'
    userCred = ({
        ...userCred,
        numOfPosts: 0,
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
//     await signup({ fullname: 'Puki Norma', username: 'yuval1', password: '12345' })
//     await signup({ fullname: 'Master Adminov', username: 'shaked', password: '12345' })
//     await signup({ fullname: 'Muki G', username: 'daniel', password: '12345' })
// })()
