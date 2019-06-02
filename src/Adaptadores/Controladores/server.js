const express = require('express');
const app = express();
const ConexionAMongoDB = require('../ConexionesDB/ConexionAMongoDB');
const rutas = require('./rutas');
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

var puerto = process.env.PORT || '3000';
app.set('port', puerto);
app.use(cors());
app.use('/api', rutas);

var conexionABaseDeDatos = new ConexionAMongoDB("mongodb://localhost:27017/", 'generador-de-boletas');

var server = http.createServer(app);
server.listen(puerto, function() {
    console.log('app levantada en el puerto ' + puerto);
});

module.exports = conexionABaseDeDatos;
exports.app = app;
