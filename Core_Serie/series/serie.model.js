const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        serieid: {type: DataTypes.STRING,defaultValue: DataTypes.UUIDV4,allowNull: false,primaryKey: true},
        name:{ type: DataTypes.STRING, allowNull: false},
        description:{ type: DataTypes.STRING, allowNull: false },
        quantity: { type: DataTypes.DOUBLE, allowNull: false },
        startdate: { type: DataTypes.DATEONLY, allowNull: false }, 
        finishdate:{ type: DataTypes.DATEONLY, allowNull: false }
    };

    return sequelize.define('Serie', attributes);
}