const EmpleadoFactory = require('../../Entidades/Factories/EmpleadoFactory');

class GeneradorEmpleadosRequestModel {

    constructor(consulta) {
        this.consulta = consulta;
    }

    obtenerRequestModel() {
        let empleadoConsulta = this.consulta.body;
        let empleados = [];
        for (let empleado of empleadoConsulta) {
            let empleadoParseado = EmpleadoFactory.crearEmpleado(empleado);
            empleados.push(empleadoParseado);
        }
        return empleados;
    }
}

module.exports = GeneradorEmpleadosRequestModel;