export const userService = {
    getUserByUsername,
    user,
    login,
    logout
}
const STORAGE_KEY_LOGGEDIN_USER = 'kaka'

function user() {
    const user = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER)
    if (user) return true
    return false
}

function getUserByUsername(username) {

}


function logout() {
    sessionStorage.clear()
    user()
}

async function login(userCred) {
    console.log(userCred);
    const user = userCred.username
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
    // const users = await storageService.query(USER_KEY)
    // const user = users.find(user => user.username === userCred.username)
    // // const user = await httpService.post('auth/login', userCred)
    // if (user) {
    //     //     socketService.login(user._id)
    //     return saveLocalUser(user)
    // }
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, wishlist: user.wishlist }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}