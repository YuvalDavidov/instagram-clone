import { httpService } from './http.service'
import { userService } from "./user.service"
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const BASE_URL = 'chat/'
let gTimeArry

export const chatService = {
    query,
    createNewChat,
    showTime,
    getTime,
    getClass
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

function showTime(timeArr) {
    gTimeArry = timeArr.map((currTime, idx) => {
        let nextTime = timeArr[idx + 1]
        let diff = (currTime - nextTime) / 1000
        diff /= 60 * 60;

        let houserDiff = Math.abs(Math.round(diff))
        if (houserDiff >= 1) return true
        else if (!nextTime) return true
        else return false
    })
}

function getTime(idx, arr) {
    return gTimeArry[idx] ? `${months[new Date(arr[idx]).getMonth()]},
                            ${new Date(arr[idx]).getDate()}
                            ${new Date(arr[idx]).getFullYear()}
                            on ${new Date(arr[idx]).getHours()}:${_getMinutes(new Date(arr[idx]).getMinutes())} ` : ''
}

function getClass(idx) {
    return gTimeArry[idx]
}

function _getMinutes(date) {
    if (date < 10) return '0' + date
    else return date
}
