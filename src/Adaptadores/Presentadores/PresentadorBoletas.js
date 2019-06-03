const ValidadorRespuestaFacebook = require('../../Entidades/Validadores/ValidadorRespuestaGeneracionBoletaFacebook');
const ValidadorRespuestaEmail = require('../../Entidades/Validadores/ValidadorRespuestaGeneracionBoletaEmail');
const ValidadorRespuestaWhatsapp = require('../../Entidades/Validadores/ValidadorRespuestaGeneracionBoletaWhatsapp');


class PresentadorBoletas {
    constructor(respuestas) {
        this.respuestasInteractor = respuestas;
    }

    obtenerObjetoRespuesta() {
        let respuestas = [];
        for (let respuesta of this.respuestasInteractor) {
            let resp = { content: respuesta };
            respuestas.push(resp);
        }
        return respuestas;
    }
}

module.exports = PresentadorBoletas;
