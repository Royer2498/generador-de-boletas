class PresentadorEmpleados {
    constructor(empleados) {
        this.empleados = empleados;
    }

    obtenerObjetoRespuesta() {
        let response = {success: false, message: '', content: {}};
        if (this.empleados.length == 0 || this.empleados == null)
            response.message = "no hay empleado(s)";
        else {
            response.success = true;
            response.content = this.empleados;
        }
        return response;
    }
}

module.exports = PresentadorEmpleados;