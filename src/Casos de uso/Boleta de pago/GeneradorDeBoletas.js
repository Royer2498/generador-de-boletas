const GeneradorBoleta = require('./GeneradorBoleta');
const UtilitariosEmpleado = require('../../Entidades/Utilitarios/UtilitariosEmpleados');
const InfoEnvioFactory = require('../../Entidades/Factories/InfoEnvioFactory');

class GeneradorDeBoletas {

    constructor(repositorio) {
        this.repositorio = repositorio;
    }

    async generarBoletas(fecha) {
        var respuestas = [];
        let boleta = {};

        let empleados = await this.repositorio.obtenerTodos();
        for (let empleado of empleados) {
            let respuesta = {};
            empleado = UtilitariosEmpleado.parsearEmpleado(empleado);
            if (empleado.esMiDiaDePaga(fecha)) {
                boleta = GeneradorBoleta.obtener(empleado, fecha);
                let infoEnvio = InfoEnvioFactory.obtenerInfoDeEnvio(empleado, "generar boleta", boleta);
                respuesta = await empleado.metodoDeEnvio.enviar(infoEnvio);
                respuestas.push(respuesta);
            }
        }
        return respuestas;
    }
}

module.exports = GeneradorDeBoletas;