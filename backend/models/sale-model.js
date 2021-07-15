'use strict'

const sequelize = require('../database/db-connection');
const { DataTypes } = require('Sequelize');
const Sequelize = require('Sequelize');
const Client = require('./client-model');

const Sale = sequelize.define('ventas', {
    id_venta: {
        type: DataTypes.INTEGER, 
        autoIncrement: true,
        primaryKey: true
    },
    id_cliente: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        references: { 
            model: Client, 
            key: 'id_cliente'
        }
    },
    fecha_hora_venta: { 
        type: DataTypes.DATE, 
        primaryKey: true,
        defaultValue: Sequelize.NOW
     },
     total: {
        type: DataTypes.DECIMAL(10,2)
     },
    activo: { 
        type: DataTypes.BOOLEAN, defaultValue: 1
     }
},{ 
    createdAt: false,
    updatedAt: false
});


module.exports = Sale;