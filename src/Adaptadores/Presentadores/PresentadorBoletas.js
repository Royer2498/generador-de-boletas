class PresentadorBoletas {
    constructor(respuesta) {
        this.respuesta = respuesta;
    }

    obtenerObjetoRespuesta() {
        if (this.respuesta)
            return { success: true, message: "boleta(s) generada(s) exitosamente" };
        else
            return { success: false, message: "operacion fallida" };
    }
}

module.exports = PresentadorBoletas;