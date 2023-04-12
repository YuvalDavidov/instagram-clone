import { storageService } from './async-storage.service'
import { userService } from './user.service';
import { utilService } from './util.service';


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
    sortByTimeStampe,
    removePost,
    getEmptyPost,
    toggleLikeCount,
    toggleCommenting,
    isPostOwendByUser
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

async function toggleCommenting(postId) {
    try {
        let post = await storageService.get(POST_KEY, postId)
        post.isCommentingAllowed = !post.isCommentingAllowed
        await storageService.put(POST_KEY, post)

    } catch (error) {
        new Error('coudl\'nt do this action on this post', error)

    }
}

async function toggleLikeCount(postId) {
    try {
        let post = await storageService.get(POST_KEY, postId)
        post.isLikeCountVisible = !post.isLikeCountVisible
        await storageService.put(POST_KEY, post)

    } catch (error) {
        new Error('coudl\'nt do this action on this post', error)

    }
}

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

async function getPosts(user, numOfPostsToQuerry) {
    let posts = await storageService.query(POST_KEY)
    return posts.reduce((acc, post) => {
        if (user.following.includes(post.userId) || post.userId === user._id) acc.push(post)
        return acc
    }, []).sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)).slice(0, numOfPostsToQuerry - 1)

}

function isPostOwendByUser(postUserId) {
    const currUserId = userService.getLoggedinUser()._id
    if (currUserId === postUserId) return true
    else return false
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
    else if (Math.round(diff * 60) < 1) return 'NOW'
    else if (Math.round(diff * 60) < 60) return Math.round(diff * 60) + " M"
    else return houserDiff + " H";
}

async function getUserPostsById(userId) {
    const posts = await storageService.query(POST_KEY)
    const userPosts = posts.filter(post => post.userId === userId)
    return userPosts
}

async function savePost(user, post) {
    let postToSave
    try {
        if (post._id) {
            postToSave = await storageService.put(POST_KEY, post)
        } else {
            postToSave = {
                userId: user._id,
                username: user.username,
                userImg: user.imgUrl,
                imgsUrl: post.imgsUrl,
                summery: post.summery || '',
                timeStamp: new Date(),
                likes: [],
                isLikeCountVisible: true,
                isCommentingAllowed: true,
                comments: [],
            }
            postToSave = await storageService.post(POST_KEY, postToSave)
        }
        return postToSave
    } catch (error) {
        console.log('there is a problem with posting your post', error);
    }

}

async function removePost(postId) {
    try {
        await storageService.remove(POST_KEY, postId)
    } catch (error) {

    }
}

function sortByTimeStampe(posts) {
    posts = posts.map((post) => {
        return {
            ...post,
            timeStamp: new Date(post.timeStamp).getTime(),
        };
    });
    return posts.sort(
        (a, b) => b.timeStamp - a.timeStamp
    );
}

function getEmptyPost() {
    return {
        imgsUrl: [],
        summery: ''
    }
}

// ; (async () => {
//     await savePost({ _id: '01axk', username: 'yuval', userImg: 'https://res.cloudinary.com/dp32ucj0y/image/upload/v1680948751/os5oztn42pljaa5ffsuc.png' }, { imgsUrl: ['https://res.cloudinary.com/dp32ucj0y/image/upload/v1674918908/cgsfbltc4pczqaqnciet.jpg', 'https://res.cloudinary.com/dp32ucj0y/image/upload/v1674918908/cgsfbltc4pczqaqnciet.jpg', 'https://res.cloudinary.com/dp32ucj0y/image/upload/v1674918908/cgsfbltc4pczqaqnciet.jpg'], summery: 'a nice livingroom' })
//     await savePost({ _id: '01axk', username: 'yuval', userImg: 'https://res.cloudinary.com/dp32ucj0y/image/upload/v1680948751/os5oztn42pljaa5ffsuc.png' }, { imgsUrl: ['https://res.cloudinary.com/dp32ucj0y/image/upload/v1674918908/cgsfbltc4pczqaqnciet.jpg', 'https://res.cloudinary.com/dp32ucj0y/image/upload/v1674918908/cgsfbltc4pczqaqnciet.jpg', 'https://res.cloudinary.com/dp32ucj0y/image/upload/v1674918908/cgsfbltc4pczqaqnciet.jpg'], summery: 'a nice livingroom' })
//     await savePost({ _id: '01axk', username: 'yuval', userImg: 'https://res.cloudinary.com/dp32ucj0y/image/upload/v1680948751/os5oztn42pljaa5ffsuc.png' }, { imgsUrl: ['https://res.cloudinary.com/dp32ucj0y/image/upload/v1674918908/cgsfbltc4pczqaqnciet.jpg', 'https://res.cloudinary.com/dp32ucj0y/image/upload/v1680952736/pl3nxtbd4koyswhkcna6.jpg'], summery: 'a nice livingroom' })
//     await savePost({ _id: 'lQ8yn', username: 'shaked', userImg: 'https://res.cloudinary.com/dp32ucj0y/image/upload/v1680948751/os5oztn42pljaa5ffsuc.png' }, { imgsUrl: ['https://res.cloudinary.com/dp32ucj0y/image/upload/v1680952736/pl3nxtbd4koyswhkcna6.jpg', 'https://res.cloudinary.com/dp32ucj0y/image/upload/v1674918908/cgsfbltc4pczqaqnciet.jpg'], summery: 'a nice livingroom' })
//     await savePost({ _id: 'lQ8yn', username: 'shaked', userImg: 'https://res.cloudinary.com/dp32ucj0y/image/upload/v1680948751/os5oztn42pljaa5ffsuc.png' }, { imgsUrl: ['https://res.cloudinary.com/dp32ucj0y/image/upload/v1680948751/os5oztn42pljaa5ffsuc.png'], summery: 'a nice livingroom' })
//     await savePost({ _id: 'lQ8yn', username: 'shaked', userImg: 'https://res.cloudinary.com/dp32ucj0y/image/upload/v1680948751/os5oztn42pljaa5ffsuc.png' }, { imgsUrl: ['https://res.cloudinary.com/dp32ucj0y/image/upload/v1680948751/os5oztn42pljaa5ffsuc.png'], summery: 'a nice livingroom' })
//     await savePost({ _id: 'n0SQy', username: 'daniel', userImg: 'https://res.cloudinary.com/dp32ucj0y/image/upload/v1680948751/os5oztn42pljaa5ffsuc.png' }, { imgsUrl: ['https://res.cloudinary.com/dp32ucj0y/image/upload/v1680952736/pl3nxtbd4koyswhkcna6.jpg', 'https://res.cloudinary.com/dp32ucj0y/image/upload/v1674918908/cgsfbltc4pczqaqnciet.jpg'], summery: 'a nice livingroom' })
//     await savePost({ _id: 'n0SQy', username: 'daniel', userImg: ' https://res.cloudinary.com/dp32ucj0y/image/upload/v1680948751/os5oztn42pljaa5ffsuc.png' }, { imgsUrl: ['https://res.cloudinary.com/dp32ucj0y/image/upload/v1680948751/os5oztn42pljaa5ffsuc.png'], summery: 'a nice livingroom' })
//     await savePost({ _id: 'n0SQy', username: 'daniel', userImg: 'https://res.cloudinary.com/dp32ucj0y/image/upload/v1680948751/os5oztn42pljaa5ffsuc.png' }, { imgsUrl: ['https://res.cloudinary.com/dp32ucj0y/image/upload/v1680948751/os5oztn42pljaa5ffsuc.png'], summery: 'a nice livingroom' })

// })()