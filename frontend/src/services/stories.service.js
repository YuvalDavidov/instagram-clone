import { userService } from '../services/user.service'
import { httpService } from './http.service';

const STORIES_KEY = 'StoriesDB'
const SROTY_URL = 'story/'

export const storiesService = {
    getStoriesByFollowings,
    createStory,
    getStoriesIdByUserId,
    getStoryById,
    updateStory
}

async function getStoriesByFollowings() {

    const currUser = userService.getLoggedinUser()
    const queryParams = `?userId=${currUser._id}`
    try {
        const story = await httpService.get(SROTY_URL + queryParams)
        return story
        // let storeis = await storageService.query(STORIES_KEY)
        // storeis = _filetrOver24H(storeis)
        // return storeis.reduce((acc, story) => {
        //     if ((currUser.following.includes(story.userInfo.userId) || story.userInfo.userId === currUser._id) && !acc.includes(story.userInfo.userId)) acc.push(story.userInfo.userId)
        //     return acc
        // }, [])
    } catch (error) {
        console.log('there is a problem with getting useres stories', error);

    }
}

// async function getStoriesByUserId(userId) {
//     try {
//         const queryParams = `?userId/${userId}`
//         const story = await httpService.get(`${SROTY_URL}/${queryParams}`)
//         return story
//         // const storeis = await storageService.query(STORIES_KEY)
//         // return storeis.filter(story => story.userInfo.userId === userId)
//     } catch (error) {
//         console.log('there is a problem with getting your story', error);
//     }
// }

async function getStoriesIdByUserId(userId) {
    try {
        const queryParams = `userId/${userId}`
        const storeis = await httpService.get(SROTY_URL + queryParams)
        return storeis
        // let storeis = await storageService.query(STORIES_KEY)
        // storeis = _filetrOver24H(storeis)
        // return storeis.filter(story => story.userInfo.userId === userId).map(story => story._id)
    } catch (error) {
        console.log('there is a problem with getting stories id', error);
    }
}

async function getStoryById(stroyId) {
    try {
        const queryParams = `storyId/${stroyId}`
        console.log('he');
        const story = await httpService.get(SROTY_URL + queryParams)
        return story
        // return await storageService.get(STORIES_KEY, stroyId)
    } catch (error) {
        console.log('there is a problem with getting this story', error);

    }
}

async function createStory(imgUrl) {

    let newStory = _getEmptyStory()
    newStory.imgUrl = imgUrl
    // let user = userService.getLoggedinUser()
    // story.userInfo = {
    //     userId: user._id,
    //     username: user.username,
    //     userImgUrl: user.imgUrl
    // }

    try {
        const story = await httpService.post(SROTY_URL, newStory)
        return story
        // await storageService.post(STORIES_KEY, story)
    } catch (error) {
        console.log('there is a problem with posting your story', error);
    }
}

async function updateStory(storyId) {
    // await storageService.put(STORIES_KEY, story)

    try {
        // await httpService.put(`${SROTY_URL}`, '/update', storyId)
    } catch (error) {
        console.log('there is a problem with updating this story', error);
    }
}

function _getEmptyStory() {
    return {
        likes: [],
        sawUsers: []
    }
}

function _filetrOver24H(arr) {
    const now = new Date().getTime()
    arr = arr.filter(story => {
        let storyTime = new Date(story.timestampe).getTime();
        let diff = (now - storyTime) / 1000;
        diff /= 60 * 60;
        let houserDiff = Math.abs(Math.round(diff));
        if (houserDiff <= 24) return story
    })
    return arr
}
// ; (async () => {
//     await createStory('https://res.cloudinary.com/dp32ucj0y/image/upload/v1674918908/cgsfbltc4pczqaqnciet.jpg')
//     await createStory('https://res.cloudinary.com/dp32ucj0y/image/upload/v1680952736/pl3nxtbd4koyswhkcna6.jpg')
// })()
