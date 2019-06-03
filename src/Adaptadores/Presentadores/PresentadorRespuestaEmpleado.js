class PresentadorRespuestaEmpleado {
    constructor(respuesta) {
        this.respuesta = respuesta;
    }

    obtenerObjetoRespuesta() {
        if (this.respuesta)
            return { success: true, message: "operacion realizada exitosamente" };
        else
            return { success: false, message: "operacion fallida" };
    }
}

module.exports = PresentadorRespuestaEmpleado;