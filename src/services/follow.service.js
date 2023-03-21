import { storageService } from './async-storage.service'
import { userService } from './user.service'

const USER_KEY = 'UserDB'

export const followService = {
    addFollow,
    checkIfFollowing,
    unFollow

}

async function unFollow(id) {
    let user = await userService.getUserById(id)
    let loggedInUser = await userService.getLoggedinUser(id)
    // 
    user = { ...user, followers: user.followers.filter(currId => currId !== loggedInUser._id) }
    loggedInUser = { ...loggedInUser, following: loggedInUser.following.filter(currId => currId !== id) }
    // 
    await storageService.put(USER_KEY, user)
    await storageService.put(USER_KEY, loggedInUser)
    // 
    userService.saveLocalUser(loggedInUser)
}

async function addFollow(id) {
    try {
        const user = await userService.getUserById(id)
        const loggedInUser = await userService.getLoggedinUser(id)
        // 
        user.followers.push(loggedInUser._id)
        loggedInUser.following.push(id)
        // 
        await storageService.put(USER_KEY, user)
        await storageService.put(USER_KEY, loggedInUser)
        // 
        userService.saveLocalUser(loggedInUser)
    } catch (error) {
        console.log('error - couldnt add follow', error)
    }

}


async function checkIfFollowing(id) {
    const loggedInUser = await userService.getLoggedinUser(id)
    console.log(loggedInUser.following.includes(id))
    return loggedInUser.following.includes(id)
} 