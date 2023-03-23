import { storageService } from './async-storage.service'


export const postService = {
    createPost,
    getUserPostsById,
    getPosts
}

const POST_KEY = 'PostDB'


async function getPosts(user) {
    let posts = await storageService.query(POST_KEY)

    return posts.reduce((acc, post) => {
        if (user.following.includes(post.userId)) acc.push(post)
        return acc
    }, [])

}

async function getUserPostsById(userId) {
    const posts = await storageService.query(POST_KEY)
    const userPosts = posts.filter(post => post.userId === userId)
    return userPosts
}

async function createPost(user, imgsUrl, summery) {

    let post = {
        userId: user._id,
        username: user.username,
        userImg: user.imgUrl,
        imgsUrl,
        summery,
        timeStamp: new Date(),
        likes: [],
        comments: [],

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
