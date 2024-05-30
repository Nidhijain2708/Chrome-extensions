const {DataTypes}=require('sequelize');
const sequelize=require('../connection/database');

// name, url, about, bio, location, follower count, connection count

const userData=sequelize.define('userData',{
    name: {
        type: DataTypes.STRING
    },
    url: {
        type: DataTypes.STRING
    },
    about: {
        type: DataTypes.STRING
    },
    bio: {
        type: DataTypes.STRING
    },
    location: {
        type: DataTypes.STRING
    },
    followers: {
        type: DataTypes.STRING
    },
    connections: {
        type: DataTypes.STRING
    },
});

module.exports=userData;