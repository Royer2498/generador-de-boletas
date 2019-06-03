const EmpleadoFactory = require('../../Entidades/Factories/EmpleadoFactory');

class GeneradorEmpleadoRequestModel {

    constructor(consulta) {
        this.consulta = consulta;
    }

    obtenerRequestModel() {
        let empleadoConsulta = this.consulta.body;
        let empleado = EmpleadoFactory.crearEmpleado(empleadoConsulta);
        return empleado;
    }
}

module.exports = GeneradorEmpleadoRequestModel;