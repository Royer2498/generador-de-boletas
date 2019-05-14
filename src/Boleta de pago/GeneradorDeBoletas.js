const GeneradorBoleta = require("./GeneradorBoleta");
const UtilitariosEmpleado = require("../UtilitariosEmpleados");
const ConexionAMongoDB = require('../server/ConexionesDB/ConexionAMongoDB');

class GeneradorDeBoletas {

    constructor() {
        this.conexionABaseDeDatos = new ConexionAMongoDB();
        this.inicializarConexion();
    }

    async inicializarConexion() {
        let conexionInicializada = await this.conexionABaseDeDatos.conectar("mongodb://localhost:27017/", 'generador-de-boletas');
        this.coleccionEmpleados = conexionInicializada.collection("empleados");
    }

    async generarBoletas() {
        var boletasDePago = await this.conectar(this.conexionABaseDeDatos, this.coleccionEmpleados);
        return boletasDePago;
    }

    conectar(conexionABaseDeDatos, coleccionEmpleados) {
        return new Promise(function (resolve,reject) {
            var boletasDePago = [];
            conexionABaseDeDatos.obtenerTodos(coleccionEmpleados, function (error, empleados) {
                if (error)
                    reject(error);
                else {
                    let fechaActual = new Date();
                    for (let empleado of empleados) {
                        empleado = UtilitariosEmpleado.parsearEmpleado(empleado);
                        if (empleado.esPayDay(fechaActual))
                            boletasDePago.push(GeneradorBoleta.obtener(empleado));
                    }
                    console.log("=========================================")
                    console.log(boletasDePago);
                    resolve(boletasDePago)
                }
            })
        })
    }
}

module.exports = GeneradorDeBoletas;