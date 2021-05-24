'use strict'

const sequelize = require('../database/db-connection');
const { DataTypes } = require('Sequelize');
const Sequelize = require('Sequelize');
const Article = require('./article-model');
const Client = require('./client-model');

const Sale = sequelize.define('ventas', {
    id_cliente: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        references: { 
            model: Client, 
            key: 'id_cliente'
        }
    },
    id_articulo: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Article,
            key: 'id_articulo'
        }
    },
    fecha_hora_venta: { 
        type: DataTypes.DATE, primaryKey: true, defaultValue: Sequelize.NOW
     },
    cantidad: { 
        type: DataTypes.INTEGER
    },
    activo: { 
        type: DataTypes.BOOLEAN, defaultValue: 1
     }
},{ 
    createdAt: false,
    updatedAt: false
});


module.exports = Sale;