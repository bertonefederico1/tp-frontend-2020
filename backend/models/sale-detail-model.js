'use strict'

const sequelize = require('../database/db-connection');
const { DataTypes } = require('Sequelize');
const Article = require('./article-model');
const Sale = require('./sale-model');

const Sales_Detail = sequelize.define('detalle_ventas', {
    articleID: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        field: 'id_articulo',
        references: { 
            model: Article, 
            key: 'id_articulo'
        }
    },
    saleID: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'id_venta',
        references: {
            model: Sale,
            key: 'id_venta'
        }
    },
    quantity: { 
        type: DataTypes.INTEGER,
        field: 'cantidad'
    }
},{ 
    createdAt: false,
    updatedAt: false
});


module.exports = Sales_Detail;