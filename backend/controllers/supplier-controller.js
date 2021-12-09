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
        const query = `SELECT p.cuit AS cuit, p.razon_social AS businessName, 
        pa.precio_unitario AS unityPrice, pa.fecha_compra AS purchaseDate
        FROM proveedores p
        INNER JOIN proveedores_articulos pa
            ON p.id_proveedor = pa.id_proveedor
        INNER JOIN (
            SELECT pa.id_articulo, p.id_proveedor, fecha_compra
            FROM proveedores_articulos pa
            INNER JOIN proveedores p
                ON p.id_proveedor = pa.id_proveedor
            WHERE fecha_compra = (
                                 SELECT MAX(fecha_compra) 
                                 FROM proveedores_articulos
                                 WHERE id_articulo = ?
                                 )
            GROUP BY id_articulo, id_proveedor
        ) ultima_compra
            ON pa.id_proveedor = ultima_compra.id_proveedor
            AND pa.id_articulo = ultima_compra.id_articulo
            AND pa.fecha_compra = (
                                 SELECT MAX(fecha_compra) 
                                 FROM proveedores_articulos
                                 WHERE id_articulo = ?
                                 );`;
        const results = await connection.query(query, {
            replacements: [req.params.id_articulo, req.params.id_articulo]
        });
        res.json(results[0]);
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