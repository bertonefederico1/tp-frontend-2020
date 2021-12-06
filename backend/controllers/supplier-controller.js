'use strict'

const { Op } = require("sequelize");
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
        res.json(suppliers);
    } catch (err) {
        res.json(err);
    }
}

supplierController.getOne = async (req, res) => {
    try {
        const supplier = await Supplier.findByPk(req.params.id);
        if(supplier === null){
            res.json('This id doesn\'t belong to any supplier')
        }
        else{
            res.json(supplier);
        }
    } catch (err){
        res.json(err);
    }
}

supplierController.createSupplier = async (req, res) => {
    try {
        await Supplier.create(req.body);
        res.json("Supplier created");
    } catch (err) {
        res.json(err);
    } 
}

supplierController.updateSupplier = async (req, res) => {
    try {
        const rowsUpdated = await Supplier.update(req.body, {
            where: {
                id_proveedor: req.params.id
            }
        });
        if(rowsUpdated[0] === 0){
            res.json("Supplier update failed");
            }
            else {
                res.json("Supplier updated");
            }
    } catch (err) {
        res.json(err);
    }
}

supplierController.suspendSupplier = async (req, res) => {
    try {
        const rowsUpdated = await Supplier.update({
            active: 0
        }, {
            where: { 
                id_proveedor: req.params.id 
            }
        });
        if(rowsUpdated[0] === 0){
            res.json("Supplier suspend failed");
            }
            else {
                res.json("Supplier suspended");
            }
    } catch (err) {
        res.json(err);
    }
}


supplierController.lastSupplierPurchaseByArticle = async (req, res) => {
    try {
        const query = 'call ultimoProveedorPorArticulo(?)';
        const results = await connection.query(query, {
            replacements: [req.params.id_articulo]
        });
        res.json(results);
    } catch (err) {
        res.json(err);
    }
}

supplierController.getSuppliersByParam = async (req, res) => {
    try{
        let suppliers = [];
        suppliers = await Supplier.findAll({
            where: {
                [Op.and]: [
                    {[Op.or]: [
                        { ciudad: {[Op.like] : '%'+req.body.searchParam+'%'} },
                        { razon_social: {[Op.like] : '%'+req.body.searchParam+'%'} },
                    ]},
                    { activo: 1 }
                ]
            }
        });

        if(suppliers === null){
            res.json('There aren\'t suppliers in this city')
        }
        else{
            res.json(suppliers);
        }

    } catch (err) {
        res.json(err);
    }
}


module.exports = supplierController;