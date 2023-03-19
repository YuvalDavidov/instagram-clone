import { storageService } from './async-storage.service'

export const userService = {
    getUserById,
    getLoggedinUser,
    login,
    logout,
    getEmptyUser,
    signup
}
const USER_KEY = 'UserDB'
const STORAGE_KEY_LOGGEDIN_USER = 'UserS'

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

async function getUserById(userId) {
    const users = await storageService.query(USER_KEY)
    const user = users.find(user => user._id === userId)
    return user


}


function logout() {
    sessionStorage.clear()
    user()
}

async function login(userCred) {
    try {
        const users = await storageService.query(USER_KEY)
        const user = users.find(user => user.username === userCred.username)
        if (user) {
            this.$store.dispatch({
                type: "login",
                credentials: this.loginCredentials,
            })
            //     socketService.login(user._id)
            return saveLocalUser(user)
        } else throw err
    } catch (err) {

    }

}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcSgdMa3-zfBbsMOTEYwMDhWumoaLYOb4kbOBP9Mmwdt9AwdzYCaL0VS1zKzlKc5DnPoWUSfVA25uggiN0o'
    const user = await storageService.post(USER_KEY, userCred)
    login(user)
    // const user = await httpService.post('auth/signup', userCred)
    // socketService.login(user._id)
    // return saveLocalUser(user)
}

function getEmptyUser() {
    return { fullname: '', username: '', password: '' }
}

// ; (async () => {
//     await signup({ fullname: 'Puki Norma', username: 'yuval1', password: '12345' })
//     await signup({ fullname: 'Master Adminov', username: 'shaked', password: '12345' })
//     await signup({ fullname: 'Muki G', username: 'daniel', password: '12345' })
// })()
