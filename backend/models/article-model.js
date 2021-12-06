'use strict'

const sequelize = require('../database/db-connection');
const { DataTypes } = require('Sequelize');

const Article = sequelize.define('articulos', {
    articleID: { 
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'id_articulo'
     },
    description: {
        type: DataTypes.STRING, field: 'descripcion'
    },
    price: {
        type: DataTypes.DECIMAL(10,2), field: 'precio'
    },
    stock: { 
        type: DataTypes.INTEGER, defaultValue: 0, field: 'stock'
     },
     picture: {
        type: DataTypes.TEXT, defaultValue: null, field: 'imagen'
     },
    active: { 
        type: DataTypes.BOOLEAN, defaultValue: 1, field: 'activo'
     }
},{
    createdAt: false,
    updatedAt: false
});

module.exports = Article;