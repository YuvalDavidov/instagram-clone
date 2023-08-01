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

async function unFollow(userId) {
    try {
        await httpService.put(FOLLOW_URL + `remove/${userId}`)
        const loggedInuser = userService.getLoggedinUser()
        let userProfile = await userService.getVipProfile(userId)
        if (userProfile) userProfile.followersCount--
        loggedInuser.followingCount--
        await userService.updateSessionStorage(loggedInuser, userProfile)
    } catch (error) {
        throw new Error('error - couldnt remove follow', error)

    }

}

async function addFollow(userId) {
    try {
        await httpService.put(FOLLOW_URL + `add/${userId}`)
        const loggedInuser = userService.getLoggedinUser()
        let userProfile = await userService.getVipProfile(userId)
        if (userProfile) userProfile.followersCount++
        loggedInuser.followingCount++
        await userService.updateSessionStorage(loggedInuser, userProfile)
    } catch (error) {
        throw new Error('error - couldnt add follow', error)
    }

}


function checkIfFollowing(id) {
    return httpService.get(FOLLOW_URL + `check/${id}`)
}