const GeneradorBoleta = require('./GeneradorBoleta');
const UtilitariosEmpleado = require('../../Entidades/Utilitarios/UtilitariosEmpleados');

class GeneradorDeBoletas {

    constructor(conexion, entidad) {
        this.conexionABaseDeDatos = conexion;
        this.coleccionEmpleados = entidad;
    }

    async generarBoletas(fecha) {
        var boletasDePago = await this.obtenerBoletas(this.conexionABaseDeDatos, this.coleccionEmpleados, fecha);
        return boletasDePago;
    }

    obtenerBoletas(conexionABaseDeDatos, coleccionEmpleados, fecha) {
        return new Promise(async function (resolve, reject) {
            var boletasDePago = [];
            let empleados = await conexionABaseDeDatos.obtenerTodos(coleccionEmpleados);
            for (let empleado of empleados) {
                empleado = UtilitariosEmpleado.parsearEmpleado(empleado);
                if (empleado.esMiDiaDePaga(fecha))
                    boletasDePago.push(GeneradorBoleta.obtener(empleado, fecha));
            }
            resolve(boletasDePago);
        })
    }
}

module.exports = GeneradorDeBoletas;