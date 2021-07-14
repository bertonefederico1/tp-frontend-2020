'use strict'

const saleController = { };

const Sale = require('../models/sale-model');
const Article = require('../models/article-model');
const Client = require('../models/client-model');
const sequelize = require('../database/db-connection');

let transact;

/* Article.belongsToMany(Client, {through: Sale, foreignKey:'id_cliente'});
Client.belongsToMany(Article, {through: Sale, foreignKey:'id_articulo'}); */

Article.hasMany(Sale, {foreignKey: 'id_articulo'});
Sale.belongsTo(Article, {foreignKey: 'id_articulo'});

Client.hasMany(Sale, {foreignKey: 'id_cliente'});
Sale.belongsTo(Client, {foreignKey: 'id_cliente'}); 


const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    };
}

saleController.getAll = async (req, res) => {
    try {
        const sales = await Sale.findAll({
            where: {
                activo: 1
            },
            include: [{
                model: Client
            },{
                model: Article
            }],
            rejectOnEmpty: true
        });

        res.status(200).json(sales);
    } catch (err){
        res.status(400).json('There aren\'t active sales');
    }
}

saleController.createSale = async (req, res) => {
    try {
        transact = await sequelize.transaction();
        
        const arrSaleID = await sequelize.query('SELECT MAX(numero_venta) as MAX_NUMERO_VENTA FROM ventas');
        const saleID = arrSaleID[0][0].MAX_NUMERO_VENTA + 1;

        await asyncForEach(req.body.articles, async (article) => {
            await Sale.create({
                numero_venta: saleID,
                id_cliente: req.body.customerID, 
                id_articulo: article.id_articulo,
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


module.exports = saleController;