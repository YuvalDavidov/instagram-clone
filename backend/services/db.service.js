const { Sequelize, DataTypes } = require('sequelize');
const { Op } = require('sequelize');
const { instegramUsers, instegramPosts, instegramStories } = require('./models/models');


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
        const result = await model.create(data)
        await model.sync()
        return result
    } catch (error) {
        console.log('error', error);
        throw new Error('db.service - failed to add record', error)
    }

}

async function removeRecord(model, itemId) {
    try {
        await model.destroy({ where: { _id: itemId } })
        await model.sync()

    } catch (error) {
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
    console.log(model, data, columnName, entityId);
    try {
        await model.update(
            {
                [columnName]: sequelize.fn('array_append', sequelize.col(columnName), data)
            },
            { where: { _id: entityId } }
        )
        await model.sync()
    } catch (error) {
        throw new Error('db.service - failed to update/add to column', error)
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

async function queryOne(model, filterBy) {
    const whereCondition = {}
    Object.keys(filterBy).forEach(key => {
        whereCondition[key] = (Array.isArray(filterBy[key])) ? { [Op.in]: filterBy[key] } : { [Op.eq]: filterBy[key] }
    })
    try {
        const entity = await model.findOne({
            where: {
                [Op.or]: [whereCondition]
            }
        })
        return entity ? entity.dataValues : entity

    } catch (error) {
        console.log(error)
        throw new Error('failed to get record', error)
    }
}


async function query(model, filterBy, numOfDesiredResults = 1000, isLessDetails = false, order = [['createdAt', 'ASC']]) {
    // filterBy needs to be an Object
    let result
    let whereCondition = {}

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
        Object.keys(filterBy).forEach(key => {
            whereCondition[key] = (Array.isArray(filterBy[key])) ? { [Op.in]: filterBy[key] } : { [Op.like]: `%${filterBy[key]}%` }
        })

        if (isLessDetails) {
            whereCondition = []
            Object.keys(filterBy).forEach(key => {
                whereCondition.push({ [key]: { [Op.like]: `%${filterBy[key]}%` } })
            })
            result = await model.findAll({
                attributes: ['username', '_id', 'imgUrl', 'fullname'],
                where: {
                    [Op.or]: whereCondition
                },
                order,
                numOfDesiredResults
            })
        } else if (filterBy.fullname && model === instegramUsers) {
            whereCondition['fullname'] = { [Op.iLike]: filterBy['fullname'] + '%' }
            result = await model.findAll({
                where: {
                    [Op.or]: [...whereCondition]
                },
                order,
                numOfDesiredResults
            })
        } else result = await model.findAll({
            where: {
                [Op.or]: whereCondition
            },
            order,
            numOfDesiredResults
        })
        return result.map((instance) => instance.dataValues)
    } catch (error) {
        console.log(error)
        throw new Error('failed to get record', error)
    }

}
module.exports = {
    addRecord,
    removeRecord,
    updateRecord,
    query,
    queryOne,
    appendToColumn,
    removeFromColumn
}