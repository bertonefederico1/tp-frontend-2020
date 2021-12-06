'use strict'

const sequelize = require('../database/db-connection');
const Sequelize = require('sequelize');

const Client = sequelize.define('clientes', {
    clientID: { 
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'id_cliente'
     },
    dni: {
        type: Sequelize.STRING, field: 'dni'
    },
    name: {
        type: Sequelize.STRING, field: 'nombre'
    },
    surname: {
        type: Sequelize.STRING, field: 'apellido'
    },
    address: {
        type: Sequelize.STRING, field: 'direccion'
    },
    telephoneNumber: {
        type: Sequelize.STRING, field: 'telefono'
    },
    active: { 
        type: Sequelize.BOOLEAN, defaultValue: 1, field: 'activo'
     }
},{
    createdAt: false,
    updatedAt: false
});

module.exports = Client;
