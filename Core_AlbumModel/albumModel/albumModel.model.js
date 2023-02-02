const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        albumModelid:{type: DataTypes.STRING,defaultValue: DataTypes.UUIDV4,allowNull: false,primaryKey: true},
        title: { type: DataTypes.STRING, allowNull: false },
        template: { type: DataTypes.STRING, allowNull: true },
    };


    return sequelize.define('AlbumModel', attributes);
}