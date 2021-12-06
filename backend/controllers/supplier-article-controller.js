'use strict'

const sequelize = require('../database/db-connection');
const Supplier_Article = require('../models/supplier-article-model');
const Article = require('../models/article-model');
const Supplier = require('../models/supplier-model');
const supplierArticleController = { };

Supplier.belongsToMany(Article, {through: Supplier_Article, foreignKey:'id_proveedor'});
Article.belongsToMany(Supplier, {through: Supplier_Article, foreignKey:'id_articulo'});

Supplier_Article.hasOne(Supplier, {foreignKey: 'id_proveedor'});
Supplier.belongsTo(Supplier_Article, {foreignKey: 'id_proveedor'});

Supplier_Article.hasOne(Article, {foreignKey: 'id_articulo'});
Article.belongsTo(Supplier_Article, {foreignKey: 'id_articulo'});

let transact;

supplierArticleController.addPurchase = async (req, res) => {
    try {
        transact = await sequelize.transaction();
        await Supplier_Article.create(req.body, {transaction: transact});

        const article = await Article.findByPk(req.body.articleID);
        article.stock += parseInt(req.body.quantity);
        await article.save({transaction: transact});
        
        await transact.commit();
        res.json("Purchase added");
    } catch (err) {
        await transact.rollback();
        res.json(err);
    }
}

supplierArticleController.deletePurchase = async (req, res) => {
    transact = await sequelize.transaction();

    let purchased_amount = 0;
    let stock_actual = 0;
    let current_amount = 0;
    try {
        let purchase = await Supplier_Article.findOne({
            where: {
                id_articulo: req.params.id_articulo,
                id_proveedor: req.params.id_proveedor,
                fecha_compra: req.params.fecha_compra
            }
        });
        purchased_amount = parseInt(purchase.quantity, 10);
        if(purchase === null){
            res.json('Wrong ID')
        }
        else{
            let article = await Article.findOne({
                attributes: ['stock'],
                where: {
                    id_articulo: req.params.id_articulo
                }
            });
            stock_actual = parseInt(article.stock, 10);
        
            current_amount = stock_actual - purchased_amount
            
        
            await Article.update({
                stock: current_amount,
                }, {
                    where: {
                        id_articulo: req.params.id_articulo
                    }
                }, {transaction: transact});
            
            Supplier_Article.destroy({
                where: {
                    id_articulo: req.params.id_articulo,
                    id_proveedor: req.params.id_proveedor,
                    fecha_compra: req.params.fecha_compra
                }
            }, {transaction: transact});
            transact.commit();
            res.json("Purchase deleted");
        }
    } catch (err) {
        transact.rollback();
        res.json(err);
    }
    
}

supplierArticleController.getSupplierPurchases = async (req, res) => {
    try {
        const purchases = await Supplier_Article.findAll({
            order: [['fecha_compra', 'DESC']],
            where: {
                id_proveedor: req.params.id
            },
            include: [{
                    model: Supplier
                }, {
                    model: Article
                }
            ],
            rejectOnEmpty: true
        })
        res.json(purchases);
    } catch (err) {
        res.json('There aren\'t purchases with this Supplier ID');
    }

}

module.exports = supplierArticleController;