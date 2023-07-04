import { utilService } from "./util.service"
import { httpService } from './http.service'
import { userService } from "./user.service"

const BASE_URL = 'chat/'

export const chatService = {
    query,
    createNewChat
}

async function query() {
    try {
        return httpService.get(BASE_URL)
    } catch (error) {
        throw new Error('error - couldnt get chatIds', error)

    }
}

async function createNewChat(usersId) {
    const loggedInUser = userService.getLoggedinUser()
    const betweenUsers = [...usersId, loggedInUser._id]
    try {
        const topic = await httpService.post(BASE_URL, betweenUsers)
        return topic
    } catch (error) {
        throw new Error('error - couldnt create chat', error)

    }
}