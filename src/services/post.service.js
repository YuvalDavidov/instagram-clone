import { storageService } from './async-storage.service'


export const postService = {
    createPost,
    getUserPostsById
}

const POST_KEY = 'PostDB'



async function getUserPostsById(userId) {
    const posts = await storageService.query(POST_KEY)
    const userPosts = posts.filter(post => post.userId === userId)
    return userPosts
}

async function createPost(userId, imgsUrl, summery) {

    let post = {
        userId,
        imgsUrl,
        summery,
        timeStamp: new Date(),
        likes: [],
        comments: []
    }
    try {
        let newPost = await storageService.post(POST_KEY, post)
        return newPost
    } catch (error) {
        console.log('there is a problem with posting your post', error);
    }

}

// ; (async () => {
//     await createPost('nrEca', ['https://res.cloudinary.com/dp32ucj0y/image/upload/v1674918908/cgsfbltc4pczqaqnciet.jpg'], 'a nice livingroom')
//     await createPost('PcWKN', ['https://res.cloudinary.com/dp32ucj0y/image/upload/v1674918908/cgsfbltc4pczqaqnciet.jpg'], 'a nice livingroom')
//     // await createPost({iNDr6, })
// })()
