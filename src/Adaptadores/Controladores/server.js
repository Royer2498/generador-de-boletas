const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http');

const ConexionADBFactory = require('../../Entidades/Factories/ConexionADBFactory');
const EmpleadoRepositorio = require('../../Entidades/Empleados/EmpleadoRepositorio');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var puerto = process.env.PORT || '3000';
app.set('port', puerto);

var conexionABaseDeDatos;
var empleadoRepositorio;

(async function() {
    conexionABaseDeDatos = await ConexionADBFactory.crearConexionADB("mongo", "mongodb://localhost:27017/", 'generador-de-boletas')
    empleadoRepositorio = new EmpleadoRepositorio(conexionABaseDeDatos, conexionABaseDeDatos.obtenerColeccion("empleados"));
    module.exports = empleadoRepositorio;
    const rutas = require('./rutas');
    app.use('/api', rutas);
    var server = http.createServer(app);
    server.listen(puerto, function () {
        console.log('app levantada en el puerto ' + puerto);
    });
})()