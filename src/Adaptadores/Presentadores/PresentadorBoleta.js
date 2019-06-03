class PresentadorBoleta {
    constructor(respuesta) {
        this.respuesta = respuesta;
    }

    obtenerObjetoRespuesta() {
        return this.respuesta.validador.validar(this.respuesta.respuestaEnvio);
    }
}

module.exports = PresentadorBoleta;