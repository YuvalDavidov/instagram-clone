import { utilService } from "./util.service"
import { httpService } from './http.service'
import { userService } from "./user.service"

const BASE_URL = 'chat/'
let gTimeArry

export const chatService = {
    query,
    createNewChat,
    showTime,
    getTime
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
    const now = new Date().getTime()
    gTimeArry = timeArr.map((currTime, idx) => {
        let nextTime = timeArr[idx + 1]
        let diff = (currTime - nextTime) / 1000
        diff /= 60 * 60;

        let houserDiff = Math.abs(Math.round(diff))
        console.log(diff);
        if (houserDiff >= 1) return true
        else if (!nextTime) return true
        else return false
    })
    console.log(gTimeArry);

    // return `${new Date(timeArr[0]).getHours()}:${new Date(timeArr[0]).getMinutes()}`
}

function getTime(idx, arr) {
    console.log('hi', idx);
    if (idx === 7) {
        console.log(new Date(arr[idx]));
        console.log(`${new Date(arr[idx]).getHours()}:${new Date(arr[idx]).getMinutes()}`);
    }
    return gTimeArry[idx] ? `${new Date(arr[idx]).getHours()}:${new Date(arr[idx]).getMinutes()}` : ''
}

// let now = new Date().getTime();
// let postTime = new Date(postTimeStamp).getTime();
// let diff = (now - postTime) / 1000;
// diff /= 60 * 60;
// let houserDiff = Math.abs(Math.round(diff));
// if (houserDiff >= 24 && houserDiff <= 168)
//     return Math.round(houserDiff / 24) + " DAYS AGO";
// else if (houserDiff >= 168) {
//     return (
//         new Date(postTimeStamp).getDate() +
//         " " +
//         months[new Date(postTimeStamp).getMonth()]
//     );
// } else return houserDiff + " HOURS AGO";