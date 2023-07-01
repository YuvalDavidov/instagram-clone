const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'hippitipi2022', {
    host: 'databaseig.caryhww4odza.eu-north-1.rds.amazonaws.com',
    dialect: 'postgres',
    port: 5432, // default port for PostgreSQL
    logging: false, // disable logging
});


const instegramUsers = sequelize.define('instegramUsers', {
    _id: {
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
    _id: {
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
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
    },
    isCommentingAllowed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
    isLikeCountVisible: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },

},
    {
        timestamps: true, // Enable timestamps
        createdAt: 'createdAt'
    }
);

const instegramStories = sequelize.define('instegramStories', {
    _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
    },
    likes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: [],
    },
    sawUsers: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: [],
    },
    userInfo: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: [],
    }
},
    {
        timestamps: true, // Enable timestamps
        createdAt: 'createdAt'
    }
)

const instegramChats = sequelize.define('instegramChats', {
    _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    betweenUsers: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: []
    },
    chatHistory: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        // {userId, msg, timestamp}
        allowNull: true,
        defaultValue: []
    }
},
    {
        timestamps: true, // Enable timestamps
        createdAt: 'createdAt'

    }
)



sequelize
    .sync({ force: false }) // Use { force: true } to drop the table and recreate it
    .then(() => {
        console.log('User table created');


    })
    .catch((err) => {
        console.error('Error creating user table:', err);
    });

module.exports = { instegramUsers, instegramPosts, instegramStories, instegramChats }

