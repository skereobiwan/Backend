const { DataTypes } = require('sequelize');

module.exports = model;


function model(sequelize) {
    const attributes = {
        userid: {type: DataTypes.STRING,defaultValue: DataTypes.UUIDV4,allowNull: false,primaryKey: true},
        email: { type: DataTypes.STRING, allowNull: false },
        passwordHash: { type: DataTypes.STRING, allowNull: false },
        userValid: {type: DataTypes.BOOLEAN, allowNull: false}
    };

    const options = {
        defaultScope: {
            // exclude password hash by default
            attributes: { exclude: ['passwordHash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('User', attributes, options);
}