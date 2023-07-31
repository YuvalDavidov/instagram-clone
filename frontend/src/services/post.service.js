import { storageService } from './async-storage.service'
import { httpService } from './http.service';
import { userService } from './user.service';
import { utilService } from './util.service';

const POST_URL = 'post/'

export const postService = {
    savePost,
    getUserPostsById,
    getPosts,
    addLike,
    removeLike,
    addComment,
    getTime,
    didUserLikedPost,
    getCommentTime,
    removePost,
    getEmptyPost,
    toggleLikeCount,
    toggleCommenting,
    isPostOwendByUser,
    getPostById
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

async function getPostById(postId) {
    try {
        const post = await httpService.get(`${POST_URL}:${postId}`)
        // const post = await storageService.get(POST_KEY, postId)
        return post
    } catch (error) {
        new Error('coudl\'nt get this post', error)

    }
}

async function toggleCommenting(post, isCommentingAllowed) {
    try {
        post = JSON.parse(JSON.stringify(post))
        await httpService.put(POST_URL, { dataToUpdate: { isCommentingAllowed: !isCommentingAllowed }, postId: post._id })
        post.isCommentingAllowed = !post.isCommentingAllowed
        return post

    } catch (error) {
        new Error('coudl\'nt do this action on this post', error)

    }
}

async function toggleLikeCount(post, isLikeCountVisible) {
    try {
        post = JSON.parse(JSON.stringify(post))
        await httpService.put(POST_URL, { dataToUpdate: { isLikeCountVisible: !isLikeCountVisible }, postId: post._id })
        post.isLikeCountVisible = !post.isLikeCountVisible
        return post
    } catch (error) {
        new Error('coudl\'nt do this action on this post', error)

    }
}

async function addComment(post, commentInfo) {
    try {
        post = JSON.parse(JSON.stringify(post))
        commentInfo.id = utilService.makeId()
        commentInfo.timestamp = new Date()
        await httpService.put(`${POST_URL}${post._id}`, { data: { ...commentInfo }, entityName: 'comments' })
        post.comments.push(commentInfo)
        return post
    } catch (error) {
        new Error('coudl\'nt add the comment to this post', error)

    }
}
// 
async function removeLike(post, userId,) {
    try {
        post = JSON.parse(JSON.stringify(post))
        await httpService.delete(`${POST_URL}`, { postId: post._id, itemId: userId, entityName: 'likes' })
        post.likes = post.likes.filter(likedByUserId => likedByUserId !== userId)
        return post
    } catch (error) {
        new Error('coudl\'nt remove like to this post', error)
    }
}

async function addLike(post, likedUser) {
    try {
        post = JSON.parse(JSON.stringify(post))
        await httpService.put(`${POST_URL}${post._id}`, { data: likedUser, entityName: 'likes' })
        post.likes.push(likedUser)
        return post
    } catch (error) {
        new Error('coudl\'nt add like to this post', error)
    }
}

async function getPosts(userId, numOfPostsToQuerry) {
    const queryParams = `?userId=${userId}&numOfPostsToQuerry=${numOfPostsToQuerry}&isUserPostsOnly=${false}`
    let posts = await httpService.get(POST_URL + queryParams)
    return posts
    // let posts = await storageService.query(POST_KEY)
    // return posts.reduce((acc, post) => {
    //     if (user.following.includes(post.userId) || post.userId === user._id) acc.push(post)
    //     return acc
    // }, [])
    // // .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, numOfPostsToQuerry - 1)
}

function isPostOwendByUser(postUserId) {
    const currUserId = userService.getLoggedinUser()._id
    if (currUserId === postUserId) return true
    else return false
}

function didUserLikedPost(postLikes, userId) {
    let didUserLiked = postLikes.find(
        (like) => like === userId
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
    else if (Math.round(diff * 60) < 1) return 'NOW'
    else if (Math.round(diff * 60) < 60) return Math.round(diff * 60) + " M"
    else return houserDiff + " H";
}

async function getUserPostsById(userId, numOfPostsToQuerry) {
    const queryParams = `?userId=${userId}&numOfPostsToQuerry=${numOfPostsToQuerry}&isUserPostsOnly=${true}`
    return await httpService.get(POST_URL + queryParams)
    // const posts = await storageService.query(POST_KEY)
    // const userPosts = posts.filter(post => post.userId === userId)
    // return userPosts
}

async function savePost(user, post) {
    try {
        if (post._id) {
            return await httpService.put(POST_URL, { dataToUpdate: post, postId: post._id })
        } else {
            post = {
                _id: utilService.makeId(7),
                userId: user._id,
                username: user.username,
                userImg: user.imgUrl,
                imgsUrl: post.imgsUrl,
                summery: post.summery || '',
                likes: [],
                isLikeCountVisible: true,
                isCommentingAllowed: true,
                comments: [],
            }
            return await httpService.post(POST_URL, post)
        }

    } catch (error) {
        console.log('there is a problem with posting your post', error);
    }

}

async function removePost(postId) {
    try {
        await httpService.delete(`${POST_URL + postId}`)
        // await storageService.remove(POST_KEY, postId)
    } catch (error) {

    }
}


function getEmptyPost() {
    return {
        imgsUrl: [],
        summery: ''
    }
}

