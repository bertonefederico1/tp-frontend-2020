'use strict'

const Article = require('../models/article-model');
const Supplier = require('../models/supplier-model');
const Supplier_Article = require('../models/supplier-article-model');
const articleController = { };

Supplier.belongsToMany(Article, {through: Supplier_Article, foreignKey:'id_proveedor'});
Article.belongsToMany(Supplier, {through: Supplier_Article, foreignKey:'id_articulo'});

articleController.getAll = async (req, res) => {
  try {
    const articles = await Article.findAll({
      include: Supplier,
      required: true,
      where: {
        activo: 1
      },
      rejectOnEmpty: true
    }); 
    res.status(200).json(articles);
  } catch (err){
    res.status(500).json('There aren\'t active articles');
  }
  
}


articleController.getOne = async (req, res) => {
  try {
    const article = await Article.findOne({
      include: Supplier,
      where: {
        id_articulo: req.params.id,
        activo: 1
      }
    }); 
    if(article === null){
      res.status(204).json('This id doesn\'t belong to any active article')
    }
    else{
      res.status(200).json(article);
    }
  } catch (err){
    res.status(500).json(err);
  }
}


articleController.createArticle = async (req, res) => {
    try{
      await Article.create({
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        imagen: req.body.imagen
      });
      res.status(201).json("Article created");
    } catch(err){
      res.status(500).json(err);
    }
}


articleController.updateArticle = async (req, res) => {
    try {
      const rowsUpdated = await Article.update({
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        stock: req.body.stock,
        imagen: req.body.imagen
      }, {
        where: {
          id_articulo: req.params.id
        }
      });
      if(rowsUpdated[0] === 0){
        res.status(500).json("Article update failed");
        }
        else {
            res.status(200).json("Article updated");
        }
    } catch (err){
      res.status(500).json(err);
    }
}

articleController.loadStock = async (req, res) => {
  let cant_total = 0;
  let cantidad = parseInt(req.body.cantidad, 10);
  
    try {
      const article = await Article.findByPk(req.body.id_articulo,{
        attributes: ['stock']
      });
      cant_total = article.stock + cantidad;
    
      if(article === null){
        res.status(204).json('This id doesn\'t belong to any active article')
      }
      else{
        await Article.update({
          stock: cant_total
        },{
          where: { 
            id_articulo: req.body.id_articulo 
          }
        });
        res.status(200).json("Stock loaded");
      }
    } catch (err) {
      res.status(500).json(err);
    }
   
}

articleController.suspendArticle = async (req, res) => {
  try {
    const rowsUpdated = await Article.update({
      activo: 0
      }, {
        where: {
           id_articulo: req.params.id 
          }
        });
      if(rowsUpdated[0] === 0){
          res.status(204).json("Article suspend failed");
        }
        else {
          res.status(200).json("Article suspended");
        }
  } catch (err){
    res.status(500).json(err);
  }
}

module.exports = articleController;