const { DataTypes } = require('sequelize');

module.exports = model;


function model(sequelize) {
    const attributes = {
        userid: {type: DataTypes.STRING,defaultValue: DataTypes.UUIDV4,allowNull: false,primaryKey: true},
        title: { type: DataTypes.STRING, allowNull: true },
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.STRING, allowNull: false },
        gender: { type: DataTypes.STRING, allowNull: false },
        birthday: { type: DataTypes.DATEONLY, allowNull: false },
        avatar: { type: DataTypes.STRING, allowNull: false },
        documentType: { type: DataTypes.STRING, allowNull: false },
        documentNumber: { type: DataTypes.BIGINT, allowNull: false },
        documentPictureFront: { type: DataTypes.STRING, allowNull: true },
        documentPictureBack: { type: DataTypes.STRING, allowNull: true },
        renaperValid: {type: DataTypes.BOOLEAN, allowNull: false}
    };

    return sequelize.define('profile', attributes);
}