'use strict'

const saleController = { };

const Sale = require('../models/sale-model');
const Article = require('../models/article-model');
const Client = require('../models/client-model');
const sequelize = require('../database/db-connection');

Article.belongsToMany(Client, {through: Sale, foreignKey:'id_articulo'});
Client.belongsToMany(Article, {through: Sale, foreignKey:'id_cliente'});

Article.hasOne(Sale, {foreignKey: 'id_articulo'});
Sale.belongsTo(Article, {foreignKey: 'id_articulo'});

Client.hasOne(Sale, {foreignKey: 'id_cliente'});
Sale.belongsTo(Client, {foreignKey: 'id_cliente'});  

let transaction;

const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    };
}

saleController.createSale = async (req, res) => {
    try {
        transaction = await sequelize.transaction();

        await asyncForEach(req.body.articles, async (article) => {
            await Sale.create({
                id_cliente: req.body.clientID, 
                id_articulo: article.articleID,
                cantidad: req.body.quantity
            }, { transaction }); 
    
            await Article.update({
                stock: stock - cantidad
            }, { transaction });
    
            const articleUpdated = Article.findOne({
                where: {
                    id_articulo: article.articleID
                }
            });
            if (articleUpdated.stock < 0) {
                throw new Error('Stock not available');
            };
        });

        await transaction.commit();
        res.status(200).json("Sale created");
    } catch (err){
        await transaction.rollback();
        res.status(400).json(err);
    }
}


module.exports = saleController;