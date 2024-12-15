const express = require('express');
const { PORT } = require('./constants');
const setConnection = require('./db_layer/setConnection');
const startCoffeeRouter = require('./coffee/coffeeRouter');

const app = express();

let connection = undefined

const App = (connection) => {
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type', 'Access-Control-Allow-Origin', 'Origin');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });
    app.use('/coffee', startCoffeeRouter(connection))

    app.listen(PORT, () => { console.log('Server started ----> OK') })
}

connection = setConnection().then(con => App(con))