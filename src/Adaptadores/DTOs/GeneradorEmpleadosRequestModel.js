const EmpleadoFactory = require('../../Entidades/Factories/EmpleadoFactory');

class GeneradorEmpleadosRequestModel {

    constructor(consulta) {
        this.consulta = consulta;
    }

    obtenerRequestModel() {
        let empleadosConsulta = this.consulta.body;
        let empleados = [];
        for (let empleado of empleadosConsulta) {
            let empleadoParseado = EmpleadoFactory.crearEmpleado(empleado);
            empleados.push(empleadoParseado);
        }
        return empleados;
    }
}

module.exports = GeneradorEmpleadosRequestModel;