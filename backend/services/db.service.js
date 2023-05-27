const { Sequelize, DataTypes } = require('sequelize');
const { Op } = require('sequelize');
const { instegramUsers, instegramPosts } = require('./models/models');


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

const Users = sequelize.define('users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
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
        console.log('data', data);
        const result = await Users.create(data)
        console.log('result', result.toJSON());
        // await Users.sync()
        // return result.toJSON()
    } catch (error) {
        console.log('error', error);
        // throw new Error('db.service - failed to add record', error)
    }

}

addRecord('users', {
    username: 'yuval1',
    fullname: 'yuval davidov',
    password: '123456', _id: 's',
    followers: [], following: [],
    highlights: [], imgurl: 'ss', stories: [], summary: '',
})

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