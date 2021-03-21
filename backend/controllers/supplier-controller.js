'use strict'

const Supplier = require('../models/supplier-model');
const Article = require('../models/article-model');
const Supplier_Article = require('../models/supplier-article-model');
const connection = require('../database/db-connection');
const supplierController = { };

Supplier_Article.hasOne(Article, {foreignKey: 'id_articulo'});
Article.belongsTo(Supplier_Article, {foreignKey: 'id_articulo'});


 supplierController.getAll = async (req, res) => {
    try {
        const suppliers = await Supplier.findAll({
            where: {
                activo: 1
            },            
            rejectOnEmpty: true,
            include: Article, 
            required: true
        });
        res.status(200).json(suppliers);
    } catch (err) {
        res.status(500).json(err);
    }
}

supplierController.getOne = async (req, res) => {
    try {
        const supplier = await Supplier.findByPk(req.params.id);
        if(supplier === null){
            res.status(204).json('This id doesn\'t belong to any supplier')
        }
        else{
            res.status(200).json(supplier);
        }
    } catch (err){
        res.status(500).json(err);
    }
}

supplierController.createSupplier = async (req, res) => {
    try {
        await Supplier.create({
            cuit: req.body.cuit,
            razon_social: req.body.razon_social,
            ciudad: req.body.ciudad,
            direccion: req.body.direccion,
            telefono: req.body.telefono
        });
        res.status(201).json("Supplier created");
    } catch (err) {
        res.status(500).json(err);
    } 
}

supplierController.updateSupplier = async (req, res) => {
    try {
        const rowsUpdated = await Supplier.update({
            cuit: req.body.cuit,
            razon_social: req.body.razon_social,
            ciudad: req.body.ciudad,
            direccion: req.body.direccion,
            telefono: req.body.telefono
        }, {
            where: {
                id_proveedor: req.params.id
            }
        });
        if(rowsUpdated[0] === 0){
            res.status(204).json("Supplier update failed");
            }
            else {
                res.status(200).json("Supplier updated");
            }
    } catch (err) {
        res.status(500).json(err);
    }
}

supplierController.suspendSupplier = async (req, res) => {
    try {
        const rowsUpdated = await Supplier.update({
            activo: 0
        }, {
            where: { 
                id_proveedor: req.params.id 
            }
        });
        if(rowsUpdated[0] === 0){
            res.status(204).json("Supplier suspend failed");
            }
            else {
                res.status(200).json("Supplier suspended");
            }
    } catch (err) {
        res.status(500).json(err);
    }
}


supplierController.lastSupplierPurchaseByArticle = async (req, res) => {
    try {
        const query = 'call ultimoProveedorPorArticulo(?)';
        const results = await connection.query(query, {
            replacements: [req.params.id_articulo]
        });
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = supplierController;