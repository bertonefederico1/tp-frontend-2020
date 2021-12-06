'use strict'

const sequelize = require('../database/db-connection');
const { DataTypes } = require('Sequelize');
const Sequelize = require ('Sequelize');
const Article = require('./article-model');
const Supplier = require('./supplier-model');

const Supplier_Article = sequelize.define('proveedores_articulos', {
    articleID: { type: DataTypes.INTEGER, 
                   primaryKey: true,
                   field: 'id_articulo',
                   references: { 
                       model: Article, 
                       key: 'id_articulo'
                    }
                },
    supplierID: { type: DataTypes.INTEGER,
                    primaryKey: true,
                    field: 'id_proveedor',
                    references: {
                        model: Supplier,
                        key: 'id_proveedor'
                    }
                },
    purchaseDate: { 
        type: DataTypes.DATE, primaryKey: true, defaultValue: Sequelize.NOW, field: 'fecha_compra'
     },
    unityPrice: {
        type: DataTypes.DECIMAL(10,2), field: 'precio_unitario'
    },
    quantity: { 
        type: DataTypes.INTEGER,
        field: 'cantidad'
    }
},{
    createdAt: false,
    updatedAt: false
});


module.exports = Supplier_Article;