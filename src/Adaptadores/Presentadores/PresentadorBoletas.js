const ValidadorRespuestaFacebook = require('../../Entidades/Validadores/ValidadorRespuestaGeneracionBoletaFacebook');
const ValidadorRespuestaEmail = require('../../Entidades/Validadores/ValidadorRespuestaGeneracionBoletaEmail');
const ValidadorRespuestaWhatsapp = require('../../Entidades/Validadores/ValidadorRespuestaGeneracionBoletaWhatsapp');


class PresentadorBoletas {
    constructor(respuesta) {
        this.respuesta = respuesta;
    }

    obtenerObjetoRespuesta() {
        return this.respuesta.validador.validar(this.respuesta.respuestaEnvio);
    }
}

module.exports = PresentadorBoletas;