const logger = require('../../services/logger.service')
const postService = require('./post.service')

async function getPosts(req, res) {
    const { user, numOfPostsToQuerry, isUserPostsOnly } = req.body
    try {
        const posts = await postService.query(user, numOfPostsToQuerry, isUserPostsOnly)
        res.json(posts)
    } catch (error) {
        logger.error('post controller - cannot get posts' + err)
        res.status(401).send({ err: `Failed to get posts ${err}` })
    }
}

async function getPostById(req, res) {
    try {
        const post = await postService.getPostById(req.body.postId)
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
    } catch (error) {
        logger.error('post controller - cannot update post' + err)
        res.status(401).send({ err: `Failed to update post ${err}` })
    }
}

async function removePost(req, res) {
    try {
        await postService.removePost(req.body.postId)
    } catch (error) {
        logger.error('post controller - cannot remove post' + err)
        res.status(401).send({ err: `Failed to remove post ${err}` })
    }
}

async function addPost(req, res) {
    try {
        const addedPost = await postService.addPost(req.body.post)
        res.json(addedPost)
    } catch (error) {
        logger.error('post controller - cannot add post' + err)
        res.status(401).send({ err: `Failed to add post ${err}` })
    }
}

module.exports = {
    getPostById,
    getPosts,
    removePost,
    updatePost,
    addPost
}