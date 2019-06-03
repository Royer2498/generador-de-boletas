const EmpleadoFactory = require('../../Entidades/Factories/EmpleadoFactory');

class GeneradorEmpleadoActualizarRequestModel {

    constructor(consulta) {
        this.consulta = consulta;
    }

    obtenerRequestModel() {
        let empleadoConsulta = this.consulta.body;
        let id = empleadoConsulta._id;
        delete empleadoConsulta._id;
        empleadoConsulta.id = id;
        return empleadoConsulta;
    }
}

module.exports = GeneradorEmpleadoActualizarRequestModel;