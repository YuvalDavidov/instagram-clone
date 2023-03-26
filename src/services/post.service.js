import { storageService } from './async-storage.service'
import { userService } from './user.service';
import { utilService } from './util.service';


export const postService = {
    createPost,
    getUserPostsById,
    getPosts,
    addLike,
    removeLike,
    addComment,
    getTime,
    didUserLikedPost,
    getCommentTime
}

const POST_KEY = 'PostDB'


const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

async function addComment(postId, commentInfo) {
    try {
        let post = await storageService.get(POST_KEY, postId)
        commentInfo.id = utilService.makeId()
        commentInfo.timeStamp = new Date()
        post.comments.push(commentInfo)
        await storageService.put(POST_KEY, post)

    } catch (error) {
        new Error('coudl\'nt add the comment to this post', error)

    }
}

async function removeLike(postId, userId) {
    try {
        let post = await storageService.get(POST_KEY, postId)
        const idx = post.likes.findIndex((like) => like.userId === userId)
        post.likes.splice(idx, 1)
        await storageService.put(POST_KEY, post)
    } catch (error) {
        new Error('coudl\'nt remove like to this post', error)
    }
}

async function addLike(postId, likedUser) {
    try {
        let post = await storageService.get(POST_KEY, postId)
        post.likes.push(likedUser)
        await storageService.put(POST_KEY, post)
    } catch (error) {
        new Error('coudl\'nt add like to this post', error)
    }
}

async function getPosts(user) {
    let posts = await storageService.query(POST_KEY)

    return posts.reduce((acc, post) => {
        if (user.following.includes(post.userId)) acc.push(post)
        return acc
    }, [])

}


function didUserLikedPost(post) {
    let user = userService.getLoggedinUser();
    let didUserLiked = post.likes.find(
        (like) => like.userId === user._id
    );
    if (didUserLiked) return true;
    else return false;
}

function getTime(postTimeStamp) {
    let now = new Date().getTime();
    let postTime = new Date(postTimeStamp).getTime();
    let diff = (now - postTime) / 1000;
    diff /= 60 * 60;
    let houserDiff = Math.abs(Math.round(diff));
    if (houserDiff >= 24 && houserDiff <= 168)
        return Math.round(houserDiff / 24) + " DAYS AGO";
    else if (houserDiff >= 168) {
        return (
            new Date(postTimeStamp).getDate() +
            " " +
            months[new Date(postTimeStamp).getMonth()]
        );
    } else return houserDiff + " HOURS AGO";
}

function getCommentTime(commentTimeStamp) {
    let now = new Date().getTime();
    let commentTime = new Date(commentTimeStamp).getTime();
    let diff = (now - commentTime) / 1000;
    diff /= 60 * 60;
    let houserDiff = Math.abs(Math.round(diff));
    if (houserDiff >= 24 && houserDiff <= 168)
        return Math.round(houserDiff / 24) + " D";
    else if (houserDiff >= 168) return Math.round(houserDiff / 24) + " w";
    else if (houserDiff < 1) return Math.round(diff * 60) + " M"
    else return houserDiff + " H";
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
