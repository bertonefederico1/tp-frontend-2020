'use strict'

const sequelize = require('../database/db-connection');
const { DataTypes } = require('Sequelize');
const Article = require('./article-model');
const Sale = require('./sale-model');

const Sales_Detail = sequelize.define('detalle_ventas', {
    id_articulo: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        references: { 
            model: Article, 
            key: 'id_articulo'
        }
    },
    id_venta: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Sale,
            key: 'id_venta'
        }
    },
    cantidad: { 
        type: DataTypes.INTEGER
    }
},{ 
    createdAt: false,
    updatedAt: false
});


module.exports = Sales_Detail;