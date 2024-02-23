/* const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: '',
    password: ''
})

module.exports = pool.promise(); */

const Sequelize = require('sequelize');
const sequelize = new Sequelize('(database name)', '(root username)', '(password)', {
    dialect: 'mysql', 
    host: 'localhost'
});

module.exports = sequelize;
