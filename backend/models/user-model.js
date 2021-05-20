'use strict'

const sequelize = require('../database/db-connection');
const { DataTypes } = require('Sequelize');


const User = sequelize.define('usuarios', {
    id_usuario: { 
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
     },
    nombre_usuario: DataTypes.STRING,
    contrasenia: DataTypes.STRING
},{
    createdAt: false,
    updatedAt: false
});

module.exports = User;