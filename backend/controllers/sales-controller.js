'use strict'

const saleController = { };

const Sale = require('../models/sale-model');
const Article = require('../models/article-model');
const Client = require('../models/client-model');
const Sales_Detail = require('../models/sale-detail-model')
const sequelize = require('../database/db-connection');

let transact;


Sale.hasMany(Sales_Detail, {foreignKey: 'id_venta'});
Sales_Detail.belongsTo(Sale, {foreignKey: 'id_venta'});

Sales_Detail.hasOne(Article, {foreignKey: 'id_articulo'});
Article.belongsTo(Sales_Detail, {foreignKey: 'id_articulo'});

Client.hasOne(Sale, {foreignKey: 'id_cliente'});
Sale.belongsTo(Client, {foreignKey: 'id_cliente'}); 


saleController.getAll = async (req, res) => {
    try {
        const sales = await Sale.findAll({
            order: [['fecha_hora_venta', 'DESC']],
            where: {
                activo: 1
            },
            include: [{
                model: Client
            },{
                model: Sales_Detail,
                include: {
                    model: Article
                }
            }]
        });

        res.status(200).json(sales);
    } catch (err){
        res.status(400).json('There aren\'t active sales');
    }
}

saleController.createSale = async (req, res) => {
    try {
        transact = await sequelize.transaction();
        console.log(req.body.total);
        const sale = await Sale.create({  //Creo la cabecera
            id_cliente: req.body.customerID,
            total: req.body.total
        }, { transaction: transact }); 
        
        
        await asyncForEach(req.body.articles, async (article) => { //Creo el detalle de la venta

            await Sales_Detail.create({
                id_articulo: article.id_articulo,
                id_venta: sale.id_venta,
                cantidad: article.quantity
            }, { transaction: transact });

            const articleUpdated = await Article.findOne({
                where: {
                    id_articulo: article.id_articulo
                }
            });
    
            articleUpdated.stock -= article.quantity;
            await articleUpdated.save({transaction: transact});
            if (articleUpdated.stock < 0) {
                throw new Error('Stock not available');
            } 
        });

        await transact.commit();
        res.status(200).json('Sale created');
    } catch (err){
        await transact.rollback();
        res.status(400).json(err.message);
    }
}

saleController.deleteSale = async (req, res) => {
    try {
        transact = await sequelize.transaction();
        
        const articlesAffected = await Sales_Detail.findAll({
            where: {
                id_venta: req.params.saleID
            }
        }, { transaction: transact });

        await asyncForEach(articlesAffected, async (article) => {  //Sumo el stock de cada articulo

            const articleAffected = await Article.findOne({
                where: {
                    id_articulo: article.id_articulo
                }
            }, { transaction: transact });

            articleAffected.stock += article.cantidad;
            await articleAffected.save({transaction: transact});
        });

        await Sale.update({  
            activo: 0
        }, {
            where: {
                id_venta: req.params.saleID
            }
        }, { transaction: transact }); 

        await transact.commit();
        res.status(200).json('Sale deleted');
    } catch (err){
        await transact.rollback();
        res.status(400).json(err.message);
    }
}



const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}


module.exports = saleController;