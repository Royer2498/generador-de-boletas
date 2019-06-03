class PresentadorBoletas {

    constructor(respuesta) {
        this.respuesta = respuesta;
    }

    obtenerObjetoRespuesta() {
        if (this.respuesta.rejected.length == 0)
            return { success: true, message: "Notificacion entregada" };
        else
            return { success: false, message: "Notificacion no entregada" };
    }
}

module.exports = PresentadorBoletas;