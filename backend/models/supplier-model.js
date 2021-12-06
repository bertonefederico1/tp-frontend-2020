'use strict'

const sequelize = require('../database/db-connection');
const { DataTypes } = require('Sequelize');
const Article = require('./article-model');
const Supplier_Article = require('./supplier-article-model');

Supplier_Article.hasOne(Article, {foreignKey: 'id_articulo'});
Article.belongsTo(Supplier_Article, {foreignKey: 'id_articulo'});

const Supplier = sequelize.define('proveedores', {
    supplierID: { 
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'id_proveedor'
     },
    cuit: {
        type: DataTypes.STRING, field: 'cuit'
    },
    businessName: {
        type: DataTypes.STRING, field: 'razon_social'
    },
    city: {
        type: DataTypes.STRING, field: 'ciudad'
    },
    address: {
        type: DataTypes.STRING, field: 'direccion'
    },
    telephoneNumber: {
        type: DataTypes.STRING, field: 'telefono'
    },
    active: {
        type: DataTypes.BOOLEAN, defaultValue: 1, field: 'activo'
    }
},{
    createdAt: false,
    updatedAt: false
});

module.exports = Supplier;