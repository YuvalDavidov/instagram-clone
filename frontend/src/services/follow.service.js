import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { userService } from './user.service'

const USER_KEY = 'UserDB'
const FOLLOW_URL = 'follow/'

export const followService = {
    addFollow,
    checkIfFollowing,
    unFollow

}

async function unFollow(id) {
    try {
        const user = await httpService.put(FOLLOW_URL + `remove/${id}`)
        console.log(user);
        userService.updateLoginUser(user)

        // let user = await userService.getUserById(id)
        // let loggedInUser = userService.getLoggedinUser()
        // // 
        // user = { ...user, followers: user.followers.filter(currId => currId !== loggedInUser._id) }
        // loggedInUser = { ...loggedInUser, following: loggedInUser.following.filter(currId => currId !== id) }
        // // 
        // await storageService.put(USER_KEY, user)
        // await storageService.put(USER_KEY, loggedInUser)
        // // 
        // userService.saveLocalUser(loggedInUser)
    } catch (error) {
        throw new Error('error - couldnt remove follow', error)

    }

}

async function addFollow(id) {
    try {
        const user = await httpService.put(FOLLOW_URL + `add/${id}`)
        userService.updateLoginUser(user)
        // const user = await userService.getUserById(id)
        // const loggedInUser = userService.getLoggedinUser(id)
        // // 
        // user.followers.push(loggedInUser._id)
        // loggedInUser.following.push(id)
        // // 
        // await storageService.put(USER_KEY, user)
        // await storageService.put(USER_KEY, loggedInUser)
        // // 
        // userService.saveLocalUser(loggedInUser)
    } catch (error) {
        throw new Error('error - couldnt add follow', error)
    }

}


function checkIfFollowing(id) {
    const loggedInUser = userService.getLoggedinUser()
    console.log(loggedInUser);
    return loggedInUser.following.includes(id)
} 