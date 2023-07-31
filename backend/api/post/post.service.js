const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const { instegramPosts, instegramUsers } = require('../../services/models/models')


module.exports = {
    query,
    getPostById,
    removePost,
    addPost,
    updatePost,
    appendToColumn,
    removeFromColumn
}

async function query(userId, numOfPostsToQuerry, isUserPostsOnly) {
    try {
        let user
        let posts
        if (!isUserPostsOnly) {

            let filterByModelFollowing = { _id: userId }
            user = await dbService.query(instegramUsers, filterByModelFollowing, numOfPostsToQuerry, false, [['createdAt', 'DESC']], attribute = ['following', 'username'])
            let filterByModelPosts = { userId: user.following, username: user.username }
            posts = await dbService.query(instegramPosts, filterByModelPosts, numOfPostsToQuerry, false, [['createdAt', 'DESC']])

        } else posts = await dbService.query(instegramPosts, { userId }, numOfPostsToQuerry, false, [['createdAt', 'DESC']], attribute = undefined, isUserPostsOnly)
        return posts
    } catch (err) {
        logger.error('post.service - cannot find posts', err)
        throw new Error('post.service - cannot find posts', err)
    }

}

async function getPostById(postId) {
    try {
        return await dbService.queryOne(instegramPosts, { _id: postId })
    } catch (error) {
        logger.error(`post.service - cannot get post with id ${postId}`, error)
        throw new Error(`post.service - cannot get post with id ${postId}`, error)
    }
}

async function addPost(post) {
    try {
        await dbService.addRecord(instegramPosts, post)
        let { numOfPosts } = await dbService.queryOne(instegramUsers, { _id: post.userId }, ['numOfPosts'])
        numOfPosts++
        await dbService.updateRecord(instegramUsers, { numOfPosts }, post.userId)
        return post
    } catch (error) {
        logger.error('post.service - cannot add post', error)
        throw new Error('post.service - cannot add post', error)
    }
}

async function removePost(postId, userId) {
    try {
        let deletedRows = await dbService.removeRecord(instegramPosts, postId)
        if (deletedRows) {
            let { numOfPosts } = await dbService.queryOne(instegramUsers, { _id: userId }, ['numOfPosts'])
            numOfPosts--
            await dbService.updateRecord(instegramUsers, { numOfPosts }, userId)
            return deletedRows
        }
        else throw new Error('post.service - no posts has been removed')
    } catch (error) {
        logger.error('post.service - cannot remove post', error)
        throw new Error('post.service - cannot remove post', error)
    }
}

async function updatePost(data, postId) {
    try {
        await dbService.updateRecord(instegramPosts, data, postId)
    } catch (error) {
        logger.error('post.service - cannot update post', error)
        throw new Error('post.service - cannot update post', error)
    }
}

async function appendToColumn(data, columnName, postId) {

    try {
        await dbService.appendToColumn(instegramPosts, data, columnName, postId)
    } catch (err) {
        logger.error('post.service - cannot append to array', err)
        throw new Error('post.service - cannot append to array', err)
    }
}

async function removeFromColumn(columnName, itemId, postId) {
    try {
        await dbService.removeFromColumn(instegramPosts, columnName, itemId, postId)
    } catch (error) {
        logger.error('post.service - cannot remove item from array', error)
        throw new Error('post.service - cannot remove item from array', error)
    }
}