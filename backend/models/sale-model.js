'use strict'

const sequelize = require('../database/db-connection');
const { DataTypes } = require('Sequelize');
const Sequelize = require('Sequelize');
const Client = require('./client-model');

const Sale = sequelize.define('ventas', {
    saleID: {
        type: DataTypes.INTEGER, 
        autoIncrement: true,
        primaryKey: true,
        field: 'id_venta'
    },
    clientID: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        field: 'id_cliente',
        references: { 
            model: Client, 
            key: 'id_cliente'
        }
    },
    saleDateTime: { 
        type: DataTypes.DATE, 
        primaryKey: true,
        defaultValue: Sequelize.NOW,
        field: 'fecha_hora_venta'
     },
     total: {
        type: DataTypes.DECIMAL(10,2),
        field: 'total'
     },
    active: { 
        type: DataTypes.BOOLEAN, defaultValue: 1, field: 'activo'
     }
},{ 
    createdAt: false,
    updatedAt: false
});


module.exports = Sale;