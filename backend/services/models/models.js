require('dotenv').config()
const { Sequelize, DataTypes, Op } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', process.env.POSTGRE_SQL_DB_PASSWORD, {
    host: process.env.DB_AWS_INSTANCE,
    dialect: 'postgres',
    port: 5432, // default port for PostgreSQL
    logging: false, // disable logging
});


const picgramUsers = sequelize.define('picgramUsers', {
    _id: {
        type: DataTypes.STRING,
        primaryKey: true,
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
    vipProfiles: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
        allowNull: true
    }
});

const picgramPosts = sequelize.define('picgramPosts', {
    _id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: false,
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
        allowNull: false,
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

const picgramStories = sequelize.define('picgramStories', {
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

const picgramChats = sequelize.define('picgramChats', {
    _id: {
        type: DataTypes.STRING,
        primaryKey: true,
        // autoIncrement: true,
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

const picgramNotifications = sequelize.define('picgramNotifications', {
    _id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''

    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'pending'
    },
    fromUser: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
    }
},
    {
        timestamps: true, // Enable timestamps
        createdAt: 'createdAt'

    })

picgramNotifications.belongsTo(picgramUsers, { foreignKey: 'fromUser', targetKey: '_id' })
sequelize
    .sync({ force: false }) // Use { force: true } to drop the table and recreate it
    .then(async () => {

    })
    .catch((err) => {
        // console.error('Error creating user table:', err);
    });

module.exports = { picgramUsers, picgramPosts, picgramStories, picgramChats, picgramNotifications }

