let userSequelize : sequelizeObject = require("sequelize");
let userBD = require("../mysql");

interface sequelizeObject {
    INTEGER?: object
    STRING?: object
}

module.exports = userBD.sequelize['define'](
    'user',
    {
        id: {
            type: userSequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: userSequelize.STRING
        },
        avatar: {
            type: userSequelize.STRING
        }
    },
    {
        tableName: 'user',
        timestamps: false,
        createdAt: 'created',
    }
);
