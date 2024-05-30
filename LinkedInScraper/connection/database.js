const Sequelize=require('sequelize').Sequelize;

// database, username, password, options

const sequelize=new Sequelize('linkedinData','root','passwordOfMySQL',{
    dialect: 'mysql',
    host: 'localhost',
});

module.exports=sequelize;