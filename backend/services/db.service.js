const { Sequelize, DataTypes } = require('sequelize');
const { Op } = require('sequelize');
const { instegramUsers, instegramPosts } = require('./models/models');


// const sequelize = new Sequelize('postgres', 'postgres', 'hippitipi2022', {
//     host: 'databaseig.caryhww4odza.eu-north-1.rds.amazonaws.com',
//     dialect: 'postgres',
//     port: 5432, // default port for PostgreSQL
//     logging: false, // disable logging
// });

// sequelize
//     .authenticate()
//     .then(async () => {
//         console.log('Database connection established successfully.');
//     })
//     .catch((err) => {
//         console.error('db.service - Unable to connect to the database:', err);
//     });




// addRecord(instegramUsers, {
//     username: 'yuval2',
//     password: '1234556',
//     fullname: 'Yuval davidov ha gay',

// })

async function addRecord(model, data) {
    try {
        // const model = sequelize.define(modelName, {}, { tableName: modelName })
        const result = await model.create(data)
        // console.log('data------>', result)
        await model.sync()
        return result.toJSON()
    } catch (error) {
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
        return await model.findOne({ where: { id: itemId } })
    } catch (error) {
        throw new Error('db.service - failed to update record', error)
    }

}

async function query(model, filterBy, isLessDetails = false, limit = Infinity, order = ['createdAt', 'ASC']) {
    // filterBy needs to be an Object
    try {
        if (!filterBy) return await model.findAll()
        // constructing the conditions for the sql 
        const whereCondition = {}
        Object.keys(filterBy).forEach(key => {
            (Array.isArray(filterBy[key])) ? whereCondition[key] = { [Op.in]: filterBy[key] } : whereCondition[key] = { [Op.eq]: filterBy[key] }
        })
        if (model === instegramUsers) {
            whereCondition['fullname'] = { [Op.iLike]: filterBy['fullname'] + '%' }
            console.log('users - verfied')
        }

        if (isLessDetails) return await model.findAll({
            attributes: ['username', 'id', 'imgUrl', 'fullname'],
            where: {
                [Op.or]: [whereCondition]
            },
            order,
            limit
        })
        else {
            return await model.findAll({
                where: {
                    [Op.or]: [whereCondition]
                },
                order,
                limit
            })
        }
    } catch (error) {
        throw new Error('failed to get record', error)
    }

}
module.exports = {
    addRecord,
    removeRecord,
    updateRecord,
    query
}



// addRecord(User, {
//     _id: 'dafs',
//     username: 'yuval1',
//     password: '123456',
//     fullname: 'Yuval davidov',

// })