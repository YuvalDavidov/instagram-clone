import { storageService } from './async-storage.service'
import { userService } from './user.service'

const STORIES_KEY = 'StoriesDB'

export const storiesService = {
    getStoriesByFollowings,
    createStory,
    getStoriesByUserId,
    getStoriesIdByUserId,
    getStoryById
}

async function getStoriesByFollowings() {
    const currUser = userService.getLoggedinUser()
    try {
        const storeis = await storageService.query(STORIES_KEY)
        return storeis.reduce((acc, story) => {
            if ((currUser.following.includes(story.userInfo.userId) || story.userInfo.userId === currUser._id) && !acc.includes(story.userInfo.userId)) acc.push(story.userInfo.userId)
            return acc
        }, [])
        // return storeis.reduce((acc, story) => {
        //     if ((currUser.following.includes(story.userInfo.userId) || story.userInfo.userId === currUser._id) && !acc[story.userInfo.userId]) acc[story.userInfo.userId] = []
        //     if (!acc[story.userInfo.userId]) return acc
        //     acc[story.userInfo.userId].push(story._id)
        //     return acc
        // }, {})
    } catch (error) {
        console.log('there is a problem with getting useres stories', error);

    }
}

async function getStoriesByUserId(userId) {
    try {
        const storeis = await storageService.query(STORIES_KEY)
        return storeis.filter(story => story.userInfo.userId === userId)
    } catch (error) {
        console.log('there is a problem with posting your story', error);
    }
}

async function getStoriesIdByUserId(userId) {
    try {
        const storeis = await storageService.query(STORIES_KEY)
        return storeis.filter(story => story.userInfo.userId === userId).map(story => story._id)
    } catch (error) {
        console.log('there is a problem with getting stories id', error);
    }
}

async function getStoryById(stroyId) {
    try {
        return await storageService.get(STORIES_KEY, stroyId)
    } catch (error) {
        console.log('there is a problem with getting this story', error);

    }
}

async function createStory(imgUrl) {
    let story = _getEmptyStory()
    let user = userService.getLoggedinUser()

    story.userInfo = {
        userId: user._id,
        username: user.username,
        userImgUrl: user.imgUrl
    }
    story.imgUrl = imgUrl

    try {
        await storageService.post(STORIES_KEY, story)
    } catch (error) {
        console.log('there is a problem with posting your story', error);
    }
}

function _getEmptyStory() {
    return {
        timeStampe: new Date,
        likes: [],
        sawUsers: []
    }
}

// ; (async () => {
//     await createStory('https://res.cloudinary.com/dp32ucj0y/image/upload/v1674918908/cgsfbltc4pczqaqnciet.jpg')
//     await createStory('https://res.cloudinary.com/dp32ucj0y/image/upload/v1674918908/cgsfbltc4pczqaqnciet.jpg')
//     await createStory('https://res.cloudinary.com/dp32ucj0y/image/upload/v1680952736/pl3nxtbd4koyswhkcna6.jpg')
//     await createStory('https://res.cloudinary.com/dp32ucj0y/image/upload/v1674918908/cgsfbltc4pczqaqnciet.jpg')
//     await createStory('https://res.cloudinary.com/dp32ucj0y/image/upload/v1680952736/pl3nxtbd4koyswhkcna6.jpg')
//     await createStory('https://res.cloudinary.com/dp32ucj0y/image/upload/v1674918908/cgsfbltc4pczqaqnciet.jpg')

// })()
