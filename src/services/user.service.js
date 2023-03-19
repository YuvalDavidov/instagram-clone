import { storageService } from './async-storage.service'

export const userService = {
    getUserByUsername,
    getLoggedinUser,
    login,
    logout
}
const USER_KEY = 'UserDB'
const STORAGE_KEY_LOGGEDIN_USER = 'UserS'

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getUserByUsername(username) {


}


function logout() {
    sessionStorage.clear()
    user()
}

async function login(userCred) {
    const users = await storageService.query(USER_KEY)
    const user = users.find(user => user.username === userCred.username)
    // // const user = await httpService.post('auth/login', userCred)
    if (user) {
        //     socketService.login(user._id)
        return saveLocalUser(user)
    }
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, wishlist: user.wishlist }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcSgdMa3-zfBbsMOTEYwMDhWumoaLYOb4kbOBP9Mmwdt9AwdzYCaL0VS1zKzlKc5DnPoWUSfVA25uggiN0o'
    const user = await storageService.post(USER_KEY, userCred)
    // const user = await httpService.post('auth/signup', userCred)
    // socketService.login(user._id)
    // return saveLocalUser(user)
}

// ; (async () => {
//     await signup({ fullname: 'Puki Norma', username: 'yuval1', password: '12345' })
//     await signup({ fullname: 'Master Adminov', username: 'shaked', password: '12345' })
//     await signup({ fullname: 'Muki G', username: 'daniel', password: '12345' })
// })()
