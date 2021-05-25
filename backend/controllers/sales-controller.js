'use strict'

const saleController = { };

const Sale = require('../models/sale-model');
const Article = require('../models/article-model');
const Client = require('../models/client-model');
const sequelize = require('../database/db-connection');

/* Article.belongsToMany(Client, {through: Sale, foreignKey:'id_articulo'});
Client.belongsToMany(Article, {through: Sale, foreignKey:'id_cliente'});  */

Article.hasMany(Sale, {foreignKey: 'id_articulo'});
Sale.belongsTo(Article, {foreignKey: 'id_articulo'});

Client.hasMany(Sale, {foreignKey: 'id_cliente'});
Sale.belongsTo(Client, {foreignKey: 'id_cliente'});  

let transact;

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
                model: Article
            },
            {
                model: Client  
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

        await asyncForEach(req.body.articles, async (article) => {
            await Sale.create({
                id_cliente: req.body.clientID, 
                id_articulo: article.articleID,
                cantidad: article.quantity
            }, { transaction: transact }); 
    
            const articleUpdated = await Article.findOne({
                where: {
                    id_articulo: article.articleID
                }
            });

            articleUpdated.stock -= article.quantity;

            await articleUpdated.save({transaction: transact});
            
            if (articleUpdated.stock < 0) {
                throw new Error('Stock not available');
            };
        });

        await transact.commit();
        res.status(200).json("Sale created");
    } catch (err){
        await transact.rollback();
        res.status(400).json(err);
    }
}


module.exports = saleController;