const { DataTypes } = require('sequelize');

module.exports = model;


function model(sequelize) {
    const attributes = {
        stampid: {type: DataTypes.STRING,defaultValue: DataTypes.UUIDV4,allowNull: false,primaryKey: true},
        stampModelid: { type: DataTypes.STRING, allowNull: false },
        userid: { type: DataTypes.STRING, allowNull: false },
        state: { type: DataTypes.STRING, allowNull: false }
    };
    return sequelize.define('User_stamp', attributes);
}