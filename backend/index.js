'use strict'

const express = require('express');
const morgan = require('morgan');
const app = express();
const routes = require('./routes/routes');
const cors = require('cors');

const LoginController = require('./controllers/login-controller');

const port = process.env.PORT || 3000;

//Settings
app.set('port', port);

//Middlewares
app.use(cors({
    origin: 'http://localhost:4200'
}));
app.use(morgan('dev'));
app.use(express.json());

app.use(LoginController.verifyToken); //Middleware para validar el token en cada petición

//Routes
app.use('/', routes);


app.listen(port, ()=>{
    console.log(`Server on http://localhost:${port}`);
});
