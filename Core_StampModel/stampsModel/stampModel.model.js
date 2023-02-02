const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        stampModelid: {type: DataTypes.STRING,defaultValue: DataTypes.UUIDV4,allowNull: false,primaryKey: true},
        serieid:{ type: DataTypes.STRING, allowNull: false },
        quantity:{ type: DataTypes.DOUBLE, allownull: false},
        quantityRemainder:{ type: DataTypes.DOUBLE, allownull: false},
        description:{ type: DataTypes.STRING, allowNull: false },
        linkDesign: { type: DataTypes.STRING, allowNull: false },
        unitCost: { type: DataTypes.DECIMAL, allowNull: false }, 
        currency:{ type: DataTypes.STRING, allowNull: false },
        index:{ type: DataTypes.STRING, allowNull: false },
        state:{ type: DataTypes.STRING, allowNull: false },
        changeStateDate: { type: DataTypes.DATE, allowNull: false }
    };

    return sequelize.define('StampModel', attributes);
}