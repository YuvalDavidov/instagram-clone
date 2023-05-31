import { storageService } from './async-storage.service'
import { userService } from './user.service'

const USER_KEY = 'UserDB'

export const followService = {
    addFollow,
    checkIfFollowing,
    unFollow

}

async function unFollow(id) {
    try {
        let user = await userService.getUserById(id)
        let loggedInUser = userService.getLoggedinUser(id)
        // 
        user = { ...user, followers: user.followers.filter(currId => currId !== loggedInUser._id) }
        loggedInUser = { ...loggedInUser, following: loggedInUser.following.filter(currId => currId !== id) }
        // 
        await storageService.put(USER_KEY, user)
        await storageService.put(USER_KEY, loggedInUser)
        // 
        userService.saveLocalUser(loggedInUser)
    } catch (error) {
        throw new Error('error - couldnt remove follow', error)

    }

}

async function addFollow(id) {
    try {
        const user = await userService.getUserById(id)
        const loggedInUser = userService.getLoggedinUser(id)
        // 
        user.followers.push(loggedInUser._id)
        loggedInUser.following.push(id)
        // 
        await storageService.put(USER_KEY, user)
        await storageService.put(USER_KEY, loggedInUser)
        // 
        userService.saveLocalUser(loggedInUser)
    } catch (error) {
        throw new Error('error - couldnt add follow', error)
    }

}


function checkIfFollowing(id) {
    const loggedInUser = userService.getLoggedinUser(id)
    return loggedInUser.following.includes(id)
} 