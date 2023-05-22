const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const { instegramPosts } = require('../../services/models/models')

async function query(user, numOfPostsToQuerry) {
    const filterBy = { userId: user.following } // צריך לעשות פילטר ביי - והבעיה היא שהפילטר בי בפרונט מתבסס על זה שקודם אביא את כל הפוסטים - צריך להבין איך לעשות זאת - לדוגמה כאן, היוזר פולואינג הוא מערך ואני צריך את הספציפי
    let posts = await dbService.query(instegramPosts,)
}