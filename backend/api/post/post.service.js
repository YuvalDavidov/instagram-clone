const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const { instegramPosts } = require('../../services/models/models')


module.exports = {
    query,
    getPostById,
    removePost,
    addPost,
    updatePost
}

async function query(user, numOfPostsToQuerry, isUserPostsOnly) {
    try {
        let filterBy
        if (!isUserPostsOnly) filterBy = { userId: user.following, username: user.username }
        else {
            filterBy = { userId: user._id }
            numOfPostsToQuerry = 15
        }
        let posts = await dbService.query(instegramPosts, filterBy, false, numOfPostsToQuerry, ['createdAt', 'DESC'])
        return posts
    } catch (error) {
        logger.error('post.service - cannot find posts', err)
        throw new Error('post.service - cannot find posts', err)
    }

}

async function getPostById(postId) {
    try {
        return await dbService.query(instegramPosts, { _id: postId })
    } catch (error) {
        logger.error(`post.service - cannot get post with id ${postId}`, err)
        throw new Error(`post.service - cannot get post with id ${postId}`, err)
    }
}

async function addPost(post) {
    try {
        await dbService.addRecord(instegramPosts, post)
        return post
    } catch (error) {
        logger.error('post.service - cannot add post', err)
        throw new Error('post.service - cannot add post', err)
    }
}

async function removePost(postId) {
    try {
        await dbService.removeRecord(instegramPosts, postId)
    } catch (error) {
        logger.error('post.service - cannot remove post', err)
        throw new Error('post.service - cannot remove post', err)
    }
}

async function updatePost(data, postId) {
    try {
        await dbService.updateRecord(instegramPosts, data, postId)
    } catch (error) {
        logger.error('post.service - cannot update post', err)
        throw new Error('post.service - cannot update post', err)
    }
}