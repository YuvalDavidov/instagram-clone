const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const { instegramPosts } = require('../../services/models/models')

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

async function addPost(post,)

