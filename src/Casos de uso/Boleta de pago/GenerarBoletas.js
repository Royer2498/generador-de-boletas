const GeneradorBoleta = require('./GeneradorBoleta');
const UtilitariosEmpleado = require('../../Entidades/Utilitarios/UtilitariosEmpleados');
const InfoEnvioFactory = require('../../Entidades/Factories/InfoEnvioFactory');

class GenerarBoletas {

    constructor(repositorio) {
        this.repositorio = repositorio;
    }

    async generarBoletas(fecha) {
        let transportadorBoletas = [];
        let empleados = await this.repositorio.obtenerTodos();
        for (let empleado of empleados) {
            let transportadorBoleta = { metodoDeEnvio: null, infoEnvio: null };
            empleado = UtilitariosEmpleado.parsearEmpleado(empleado);
            if (empleado.esMiDiaDePaga(fecha)) {
                let boleta = GeneradorBoleta.obtener(empleado, fecha);
                transportadorBoleta.infoEnvio = InfoEnvioFactory.obtenerInfoDeEnvio(empleado, "generar boleta", boleta);
                transportadorBoleta.metodoDeEnvio = empleado.metodoDeEnvio;
                transportadorBoletas.push(transportadorBoleta);
            }
        }
        return transportadorBoletas;
    }
}

module.exports = GenerarBoletas;