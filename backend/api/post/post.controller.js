const logger = require('../../services/logger.service')
const postService = require('./post.service')

async function getPosts(req, res) {

    let { userId, numOfPostsToQuerry, isUserPostsOnly } = req.query
    isUserPostsOnly = Boolean(isUserPostsOnly)
    try {
        const posts = await postService.query(userId, numOfPostsToQuerry, isUserPostsOnly)
        res.json(posts)
    } catch (err) {
        logger.error('post controller - cannot get posts' + err)
        res.status(401).send({ err: `Failed to get posts ${err}` })
    }
}

async function getPostById(req, res) {
    try {
        const post = await postService.getPostById(req.params._id)
        res.json(post)
    } catch (error) {
        logger.error('post controller - cannot get post' + err)
        res.status(401).send({ err: `Failed to get post ${err}` })
    }
}

async function updatePost(req, res) {
    const { dataToUpdate, postId } = req.body
    try {
        const updatedPost = await postService.updatePost(dataToUpdate, postId)
        return updatedPost
    } catch (err) {
        logger.error('post controller - cannot update post' + err)
        res.status(401).send({ err: `Failed to update post ${err}` })
    }
}

async function removePost(req, res) {
    try {
        await postService.removePost(req.params.postId)
    } catch (err) {
        logger.error('post controller - cannot remove post' + err)
        res.status(401).send({ err: `Failed to remove post ${err}` })
    }
}

async function addPost(req, res) {
    try {
        const post = req.body
        const addedPost = await postService.addPost(post)
        res.json(addedPost)
    } catch (err) {
        logger.error('post controller - cannot add post' + err)
        res.status(401).send({ err: `Failed to add post ${err}` })
    }
}

async function appendItem(req, res) {
    const { data, entityName } = req.body
    try {
        await postService.appendToColumn(data, entityName, req.params._id)
    } catch (err) {
        logger.error('post controller - cannot append to column' + err)
        res.status(401).send({ err: `Failed to append to column ${err}` })
    }
}

async function removeItem(req, res) {
    const { postId } = req.params
    const { itemId, entityName } = req.body
    try {
        await postService.removeFromColumn(entityName, itemId, postId)
    } catch (err) {
        logger.error('post controller - cannot remove item from column' + err)
        res.status(401).send({ err: `Failed to remove item from column ${err}` })
    }
}

module.exports = {
    getPostById,
    getPosts,
    removePost,
    updatePost,
    addPost,
    appendItem,
    removeItem
}