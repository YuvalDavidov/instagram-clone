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
        await httpService.put(FOLLOW_URL + `remove/${id}`)
        const user = userService.getLoggedinUser()
        user.followingCount--
        userService.updateLoginUser(user)
    } catch (error) {
        throw new Error('error - couldnt remove follow', error)

    }

}

async function addFollow(id) {
    try {
        await httpService.put(FOLLOW_URL + `add/${id}`)
        const user = userService.getLoggedinUser()
        user.followingCount++
        userService.updateLoginUser(user)
    } catch (error) {
        throw new Error('error - couldnt add follow', error)
    }

}


function checkIfFollowing(id) {
    return httpService.get(FOLLOW_URL + `check/${id}`)
}