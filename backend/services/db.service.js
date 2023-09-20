const { Sequelize, DataTypes } = require('sequelize');
const { Op } = require('sequelize');
const { instegramUsers, instegramPosts, instegramStories, instegramNotifications } = require('./models/models');


const sequelize = new Sequelize('postgres', 'postgres', 'hippitipi2022', {
    host: 'databaseig.caryhww4odza.eu-north-1.rds.amazonaws.com',
    dialect: 'postgres',
    port: 5432, // default port for PostgreSQL
    logging: false, // disable logging
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
    })
    .catch((err) => {
        console.error('db.service - Unable to connect to the database:', err);
    });


sequelize
    .sync()
    .then(() => {
        console.log('Models synchronized successfully');

    })
    .catch((err) => {
        console.error('Error synchronizing models:', err);
    });


async function addRecord(model, data) {
    try {
        console.log(model, data);
        const result = await model.create(data)
        await model.sync()
        return result
    } catch (error) {
        throw new Error('db.service - failed to add record', error)
    }

}

async function removeRecord(model, itemId) {
    try {

        const deletedRows = await model.destroy({ where: { _id: itemId } })
        await model.sync()
        return deletedRows
    } catch (error) {
        console.log(error)
        throw new Error('db.service - failed to remove record', error)
    }

}

async function updateRecord(model, data, itemId) {
    try {
        await model.update(data, { where: { _id: itemId } })
        await model.sync()
        return await model.findOne({ where: { _id: itemId } })
    } catch (error) {
        throw new Error('db.service - failed to update record', error)
    }

}

async function appendToColumn(model, data, columnName, entityId) {
    console.log('in db service append to column===>', data, columnName, entityId)
    try {
        await model.update(
            {
                [columnName]: sequelize.fn('array_append', sequelize.col(columnName), (typeof data === "object") ? JSON.stringify(data) : data)
            },
            { where: { _id: entityId } }
        )
        await model.sync()
    } catch (error) {
        console.log(error)
        // throw new Error('db.service - failed to update/add to column', error)
    }
}

async function removeFromColumn(model, columnName, itemId, entityId) {

    try {
        await model.update(
            {
                // if the column is an array of objects than the itemId should be pass on as an object with the id as a key and itemId as the value
                // otherwise it should be pass on only as a string
                [columnName]: sequelize.fn('array_remove', sequelize.col(columnName), itemId)
            },
            { where: { _id: entityId } }
        )
        await model.sync()
    } catch (error) {
        throw new Error('db.service - remove from column', error)
    }
}

async function queryOne(model, filterBy, attributes) {

    if (attributes && (attributes.includes('following') && attributes.includes('followers'))) attributes = [
        ...attributes.filter(attr => attr !== 'followers' && attr !== 'following'),
        [sequelize.fn('array_length', sequelize.col('followers'), 1), 'followersCount'],
        [sequelize.fn('array_length', sequelize.col('following'), 1), 'followingCount']
    ]
    const whereCondition = [];
    Object.keys(filterBy).forEach(key => {
        if (Array.isArray(filterBy[key])) whereCondition.push({ [key]: { [Op.contains]: filterBy[key] } });
        else whereCondition.push({ [key]: filterBy[key] });
    });

    try {
        const entity = (attributes) ? await model.findOne({
            attributes,
            where: {
                [Op.and]: whereCondition
            }
        }) :
            await model.findOne({
                where: {
                    [Op.and]: whereCondition
                }
            })

        return entity ? entity.dataValues : entity

    } catch (error) {
        console.log(error)
        // throw new Error('failed to get record', error)
    }
}
//  filterByModel1, filterByModel2, numOfDesiredResults = 1000, isLessDetails = false, order = [['createdAt', 'ASC']]
async function queryAggregate(model1, model2, filterBy, aggregateCondition) {
    console.log('here - queryAggregate');
    console.log(model1, model2, filterBy, aggregateCondition);
    let { model1Name, attributes1 } = model1
    let { model2Name, attributes2 } = model2

    aggregateCondition = `"${aggregateCondition[0].modelName}"."${aggregateCondition[0].modelKey}" 
        ${aggregateCondition[1].condition} ${(aggregateCondition[2].isArray) ? `ANY("${aggregateCondition[2].modelName}"."${aggregateCondition[2].modelKey}")` :
            `"${aggregateCondition[2].modelName}"."${aggregateCondition[2].modelKey}"`}`
    let selectFromModel1 = attributes1.reduce((acc, attribute) => {
        acc += (`"${model1Name}"."${attribute}", `)
        return acc
    }, `SELECT `)
    let selectFromModel2 = attributes2.reduce((acc, attribute, idx) => {
        if (idx === attributes2.length - 1) acc += (`"${model2Name}"."${attribute.attributeName}" AS "${attribute.as}" FROM "${model1Name}" AS "${model1Name}"`)
        else acc += (`"${model2Name}"."${attribute.attributeName}" AS "${attribute.as}", `)
        return acc
    }, ``)
    let innerJoinStatment = `INNER JOIN "${model2Name}" ON ${aggregateCondition}`
    let whereStatment = filterBy.reduce((acc, f, idx) => {
        if (!idx) acc += (`WHERE ` + (`'${f.condition1}'${f.conditionSymbol}` + ((f.condition2.isArray) ? `ANY("${f.condition2.modelName}"."${f.condition2.modelKey}")` :
            `"${f.condition2.modelName}"."${f.condition2.modelKey}"`)))

        else acc += (' AND ' + (`'${f.condition1}'${f.conditionSymbol}` + ((f.condition2.isArray) ? `ANY("${f.condition2.modelName}"."${f.condition2.modelKey}")` :
            `"${f.condition2.modelName}"."${f.condition2.modelKey}"`)))
        return acc
    }, ``)
    let sqlRawCode = (selectFromModel1 + selectFromModel2 + innerJoinStatment + whereStatment + ';')
    // console.log(sqlRawCode);
    try {
        return await sequelize.query(`${sqlRawCode}`)
        //         await sequelize.query(`SELECT "instegramChats"."_id",  "instegramChats"."betweenUsers",
        // "instegramChats"."chatHistory", "instegramChats"."createdAt", 
        // "instegramChats"."updatedAt", "instegramUsers"."_id" AS "userId", 
        // "instegramUsers"."fullname" AS "fullname", "instegramUsers"."username"
        // AS "username", "instegramUsers"."imgUrl" AS "imgUrl" 
        // FROM "instegramChats" AS "instegramChats" 
        // INNER JOIN "instegramUsers" ON "instegramUsers"."_id" = ANY("instegramChats"."betweenUsers")
        // WHERE '9493004838' = ANY ("instegramChats"."betweenUsers")
        // AND "instegramUsers"."_id" <> '9493004838';`)
    } catch (error) {
        console.log(error);
    }
}

async function query(model, filterBy, numOfDesiredResults = 1000, isLessDetails = false, order = [['createdAt', 'ASC']], attribute = undefined, isUserPostsOnly = false) {
    let result
    let whereCondition = {}
    // [Op.like]: `%${filterBy[key]}%`
    Object.keys(filterBy).forEach(key => {
        whereCondition[key] = (Array.isArray(filterBy[key])) ? filterBy[key] : { [Op.eq]: filterBy[key] }
    })
    try {
        if (!filterBy) result = await model.findAll()
        // constructing the conditions for the sql 
        if (model === instegramStories) {
            // dynamic query for stories userIds , storiesIds or specific story._id
            if (filterBy._id) {
                return queryOne(instegramStories, filterBy)
            } else {
                let opertion = Array.isArray(filterBy.userInfo.userId) ? Op.in : Op.eq
                Object.keys(filterBy).forEach(key => { whereCondition[key] = { userId: { [opertion]: filterBy.userInfo.userId } } }
                )
                return result = await model.findAll({
                    where: {
                        [Op.and]: [{
                            ...whereCondition,
                            createdAt: {
                                [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000) // Subtracting 24 hours from the current time
                            }
                        }]
                    },

                })
            }

        }

        else if (model === instegramNotifications) return _noticQuery(numOfDesiredResults)

        else if (isLessDetails) {
            whereCondition = []
            Object.keys(filterBy).forEach(key => {
                whereCondition.push({ [key]: { [Op.iLike]: filterBy[key] + '%' } })
            })

            result = await model.findAll({
                attributes: ['username', '_id', 'imgUrl', 'fullname'],
                where: {
                    [Op.or]: whereCondition
                },
                order,
                limit: numOfDesiredResults
            })

        }

        else if (attribute) {
            result = await model.findAll({
                attributes: attribute,
                where: {
                    [Op.or]: filterBy
                },
                order
            })
            return result.map((instance) => instance.dataValues)[0]
        }


        else if (model === instegramPosts) {
            result = await model.findAll({
                where: {
                    [Op.or]: whereCondition
                },
                order,
                limit: (isUserPostsOnly) ? 9 : 4,
                offset: (isUserPostsOnly) ? numOfDesiredResults - 9 : numOfDesiredResults - 4

            })

        }

        else result = await model.findAll({
            where: {
                [Op.or]: whereCondition
            },
            order,
            limit: numOfDesiredResults,
        })

        return result.map((instance) => instance.dataValues)
    } catch (error) {
        console.log(error)
        throw new Error('failed to get record', error)
    }

}

async function checkIfChatExist(model, usersIds) {
    console.log('usersIds', usersIds);
    sqlRawCode = `
  SELECT chat."betweenUsers" , chat."_id"
  FROM "instegramChats" as chat
  WHERE 
`;

    usersIds = usersIds.map(u => `'${u}' = ANY(chat."betweenUsers")`).join(' AND ');

    sqlRawCode += usersIds;

    try {
        let result = await sequelize.query(`${sqlRawCode}`)
        return result[0]
    } catch (error) {
        console.log('error', error);
    }
}
module.exports = {
    addRecord,
    removeRecord,
    updateRecord,
    query,
    queryOne,
    appendToColumn,
    removeFromColumn,
    queryAggregate,
    checkIfChatExist
}

async function _noticQuery(numOfDesiredResults) {
    let resultToSend = []
    try {
        console.log('here111');
        let result = await instegramNotifications.findAll({
            include: instegramUsers,
            where: {
                status: 'pending'
            },
            limit: numOfDesiredResults,
        })
        result.forEach((notic) => {
            const data = notic.dataValues
            const { createdAt, status, _id, type } = data
            const { _id: formUserId, username, fullname, imgUrl } = data.instegramUser.dataValues
            let newNotic = {
                createdAt,
                status,
                _id,
                type,
                fromUser: {
                    formUserId,
                    username,
                    fullname,
                    imgUrl
                }
            }
            resultToSend.push(newNotic)
        })
        console.log(resultToSend);
        return resultToSend
    } catch (error) {
        throw new Error('_noticQuery - failed to get record', error)

    }
}