const { DataTypes } = require('sequelize');
module.exports = model;

function model(sequelize) {
    const columns = {
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        username: { type: DataTypes.STRING, allowNull: false },
        hash: { type: DataTypes.STRING, allowNull: false }
    }

    return sequelize.define('User', columns)
}