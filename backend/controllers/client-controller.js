'use strict'

const Client = require('../models/client-model');
const clientController = { };

clientController.getAll = async (req, res) => {
    try {
        const clients = await Client.findAll({
            where: {
                activo: 1
            },
            rejectOnEmpty: true
        });
        res.status(200).json(clients);
    } catch (err){
        res.status(204).json('There aren\'t active clients');
    }
    
}

clientController.getOne = async (req, res) => {
    try{
        const client = await Client.findOne({
            where: {
                id_cliente: req.params.id,
                activo: 1
            }
        });
        if(client === null){
            res.status(204).json('This id doesn\'t belong to any active client')
        }
        else{
            res.status(200).json(client);
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

clientController.createClient = async (req, res) => {
    try {
        await Client.create({
            dni: req.body.dni,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            direccion: req.body.direccion,
            telefono: req.body.telefono
        }); 
        res.status(201).json("Client created");
    } catch (err){
        res.status(500).json(err);
    }
}

clientController.updateClient = async (req, res) => {
    try {
        const rowsUpdated = await Client.update({
            dni: req.body.dni,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            direccion: req.body.direccion,
            telefono: req.body.telefono
        }, {
            where: {
                id_cliente: req.params.id
            }
        });
        if(rowsUpdated[0] === 0){
        res.status(204).json("Client update failed");
        }
        else {
            res.status(200).json("Client updated");
        }
    } catch (err){
        res.status(500).json(err);
    }
    
}

clientController.suspendClient = async (req, res) => {
    try{
        const rowsUpdated = await Client.update({
            activo: 0
        },{
            where: {
                id_cliente: req.params.id
            }
        });
        if(rowsUpdated[0] === 0){
            res.status(204).json("Client suspend failed");
            }
            else {
                res.status(200).json("Client suspended");
            }
    } catch (err){
        res.status(500).json(err);
    }   
}

clientController.deleteClient = async (req, res) => {
    try{
        const rowsDeleted = await Client.destroy({
            where: {
                id_cliente: req.params.id
            }
        });
        if(rowsDeleted === 0){
            res.status(204).json("This id doesn\'t belong to any client")
        }
        else {
            res.status(200).json("Client deleted")
        }
    } catch (err){
        res.status(500).json(err);
    }
}

module.exports = clientController;