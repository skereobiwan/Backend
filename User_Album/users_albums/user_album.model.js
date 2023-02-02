const { DataTypes } = require('sequelize');

module.exports = model;


function model(sequelize) {
    const attributes = {
        albumid: {type: DataTypes.STRING,defaultValue: DataTypes.UUIDV4,allowNull: false,primaryKey: true},
        albumModelid: { type: DataTypes.STRING, allowNull: false },
        userid: { type: DataTypes.STRING, allowNull: false },
        title: { type: DataTypes.STRING, allowNull: false },
    };
    return sequelize.define('User_album', attributes);
}