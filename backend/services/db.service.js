const Sequelize = require('sequelize');


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
        console.error('Unable to connect to the database:', err);
    });

async function addRecord(model, data) {
    try {
        const result = await model.create(data)
        await model.sync()
        return result.toJSON()
    } catch (error) {
        throw new Error('failed to add record', error)
    }

}
async function removeRecord(model, itemId) {
    try {
        await model.destroy({ where: { _id: itemId } })
        await model.sync()

    } catch (error) {
        throw new Error('failed to remove record', error)
    }

}
async function updateRecord(model, data, itemId) {
    try {
        await model.update(data, { where: { _id: itemId } })
        await model.sync()

    } catch (error) {
        throw new Error('failed to update record', error)
    }

}

async function query(model, filterBy) {
    // filterBy needs to be an Object
    try {
        if (!filterBy) return await model.findAll()
        else {
            return await model.findAll({
                where: filterBy
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