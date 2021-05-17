const config = require('../config/config');
const sql = require("msnodesqlv8");
const { Sequelize } = require('sequelize');

module.exports = db = {};

init();

function init () {
    const {connectionString} = config.database;

    const sequelize = new Sequelize({
        dialect: 'mssql',
        dialectModulePath: 'msnodesqlv8/lib/sequelize',
        bindParam: false,
        dialectOptions: {
          options: {
            connectionString: config.database.connectionString,
          },
        },
    });

    db.User = require('../Models/UserModel')(sequelize);

    // sync all models with database
    sequelize.sync();
}