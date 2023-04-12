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

const Post = sequelize.define('post', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    post: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    maker: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

sequelize
    .sync()
    .then(() => {
        console.log('Table created successfully');
        return Post.create({
            post: 'This is a demo post',
            maker: 'John Doe',
        });
    })
    .then((post) => {
        console.log('Demo post inserted successfully:', post.toJSON());
    })
    .catch((err) => {
        console.error('Unable to create table:', err);
    });