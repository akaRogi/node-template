const Sequelize = require('sequelize');
const { mysql }: configObject = require('../utils/config')
const db : ValueObject = {};
interface ValueObject {
    sequelize?: object
    Sequelize?: object
}
interface configObject {
    mysql: { database: string , account: string, password: string, host: string }
}

const sequelize = new Sequelize(mysql.database, mysql.account, mysql.password, {
    host: mysql.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;