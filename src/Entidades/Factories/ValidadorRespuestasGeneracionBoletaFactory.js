const ValidadorRespuestaEmail = require('../Validadores/ValidadorRespuestaGeneracionBoletaEmail');
const ValidadorRespuestaFacebook = require('../Validadores/ValidadorRespuestaGeneracionBoletaFacebook');
const ValidadorRespuestaWhatsapp = require('../Validadores/ValidadorRespuestaGeneracionBoletaWhatsapp');

class ValidadorRespuestasGeneracionBoletaFactory {
    constructor(){
    }

    static obtenerValidador(metodoEnvio){
        switch(metodoEnvio){
            case "email":
                return new ValidadorRespuestaEmail();
            case "facebook":
                return new ValidadorRespuestaFacebook();
            case "whatsapp":
                return new ValidadorRespuestaWhatsapp();
            default:
                return null;
        }
    }
}

module.exports = ValidadorRespuestasGeneracionBoletaFactory;