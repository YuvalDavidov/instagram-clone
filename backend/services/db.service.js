const Sequelize = require('sequelize');
const { Op } = require('sequelize')

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

async function addRecord(model, data) {
    try {
        const result = await model.create(data)
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
        const updatedItem = await model.update(data, { where: { _id: itemId } })
        await model.sync()
        return updatedItem
    } catch (error) {
        throw new Error('db.service - failed to update record', error)
    }

}

async function query(model, filterBy, isLessDetails) {
    // filterBy needs to be an Object
    try {
        if (!filterBy) return await model.findAll()
        const whereCondition = {}
        Object.keys(filterBy).forEach(key => { whereCondition[key] = { [Op.eq]: filterBy[key] } })
        whereCondition['fullname'] = { [Op.iLike]: filterBy['fullname'] + '%' }
        if (isLessDetails) return await model.findAll({
            attributes: ['username', 'id', 'imgUrl', 'fullname'],
            where: {
                [Op.or]: whereCondition
            }
        })
        else {
            return await model.findAll({
                where: {
                    [Op.or]: whereCondition
                }
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