const ValidadorRespuestaEmail = require('../Validadores/ValidadorRespuestaGeneracionBoletaEmail');
const ValidadorRespuestaFacebook = require('../Validadores/ValidadorRespuestaGeneracionBoletaFacebook');
const ValidadorRespuestaWhatsapp = require('../Validadores/ValidadorRespuestaGeneracionBoletaWhatsapp');

class ValidadorRespuestasGeneracionBoletaFactory {
    constructor(){
    }

    static obtenerValidador(metodoEnvio){
        switch(metodoEnvio){
            case "Email":
                return new ValidadorRespuestaEmail();
            case "Facebook":
                return new ValidadorRespuestaFacebook();
            case "WhatsApp":
                return new ValidadorRespuestaWhatsapp();
            default:
                return null;
        }
    }
}

module.exports = ValidadorRespuestasGeneracionBoletaFactory;