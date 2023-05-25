const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'hippitipi2022', {
    host: 'databaseig.caryhww4odza.eu-north-1.rds.amazonaws.com',
    dialect: 'postgres',
    port: 5432, // default port for PostgreSQL
    logging: false, // disable logging
});


const instegramUsers = sequelize.define('instegramUsers', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    followers: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: [],
    },
    following: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: [],
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
    },
    highlights: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: [],
    },
    imgUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
    },
    numOfPosts: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    stories: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: [],
    },
    bio: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const instegramPosts = sequelize.define('instegramPosts', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    comments: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: true,
        defaultValue: [],
    },
    imgsUrl: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
    },
    likes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: [],
    },
    summery: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
    },
    userImg: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: [],
    },

},
    {
        timestamps: true, // Enable timestamps
        createdAt: 'createdAt'
    }
);


sequelize
    .sync({ force: false }) // Use { force: true } to drop the table and recreate it
    .then(() => {
        console.log('User table created');


    })
    .catch((err) => {
        console.error('Error creating user table:', err);
    });

module.exports = { instegramUsers, instegramPosts }

