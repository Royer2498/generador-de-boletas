const EmpleadoFactory = require('../../Entidades/Factories/EmpleadoFactory');
const MetodoDeEnvioFactory = require('../../Entidades/Factories/MetodoDeEnvioFactory');
const UtilitariosEmpleados = require('../../Entidades/Utilitarios/UtilitariosEmpleados');

class GeneradorBoletaRequestModel {

    constructor(consulta) {
        this.consulta = consulta;
    }

    obtenerRequestModel() {
        let requestModel = {
            metodoEnvio: MetodoDeEnvioFactory.obtenerMetodoDeEnvio(this.consulta.params.metodoEnvio),
            empleado: UtilitariosEmpleados.parsearEmpleado(this.consulta.body.empleado),
            infoEnvio: this.consulta.body.informacionEnvio
        }
        return requestModel;
    }
}

module.exports = GeneradorBoletaRequestModel;