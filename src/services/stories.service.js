import { storageService } from './async-storage.service'
import { userService } from './user.service'

const STORIES_KEY = 'StoriesDB'

export const storiesService = {
    getStoriesByFollowings,
    createStory
}

async function getStoriesByFollowings() {
    const currUser = userService.getLoggedinUser()
    try {
        const storeis = await storageService.query(STORIES_KEY)
        return storeis.reduce((acc, story) => {
            if ((currUser.following.includes(story.userInfo.userId) || story.userInfo.userId === currUser._id) && !acc[story.userInfo.userId]) acc[story.userInfo.userId] = []
            if (currUser.following.includes(story.userInfo.userId) || story.userInfo.userId === currUser._id) acc[story.userInfo.userId].push(story)
            return acc
        }, {})
    } catch (error) {

    }
}

async function createStory(imgUrl) {
    let story = _getEmptyStory()

    // let user = await userService.getUserById(userId)
    let user = userService.getLoggedinUser()
    // console.log(user);
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
        likes: []
    }
}

// ; (async () => {
//     await createStory( 'https://res.cloudinary.com/dp32ucj0y/image/upload/v1674918908/cgsfbltc4pczqaqnciet.jpg')
//     await createStory( 'https://res.cloudinary.com/dp32ucj0y/image/upload/v1674918908/cgsfbltc4pczqaqnciet.jpg')
//     await createStory( 'https://res.cloudinary.com/dp32ucj0y/image/upload/v1674918908/cgsfbltc4pczqaqnciet.jpg')
//     await createStory( 'https://res.cloudinary.com/dp32ucj0y/image/upload/v1674918908/cgsfbltc4pczqaqnciet.jpg')
//     await createStory( 'https://res.cloudinary.com/dp32ucj0y/image/upload/v1674918908/cgsfbltc4pczqaqnciet.jpg')
//     await createStory( 'https://res.cloudinary.com/dp32ucj0y/image/upload/v1674918908/cgsfbltc4pczqaqnciet.jpg')

// })()
