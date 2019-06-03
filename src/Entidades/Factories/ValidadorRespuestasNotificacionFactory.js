const ValidadorRespuestaDeNotificacionEmail = require('../Validadores/ValidadorRespuestaDeNotificacionEmail');
const ValidadorRespuestaDeNotificacionFacebook = require('../Validadores/ValidadorRespuestaDeNotificacionFacebook');
const ValidadorRespuestaDeNotificacionWhatsapp = require('../Validadores/ValidadorRespuestaDeNotificacionWhatsapp');

class ValidadorRespuestasNotificacionFactory{
    
    constructor(){}

    static obtenerValidador(metodoEnvio){
        switch(metodoEnvio){
            case "email":
                return new ValidadorRespuestaDeNotificacionEmail();
            case "facebook":
                return new ValidadorRespuestaDeNotificacionFacebook();
            case "whatsapp":
                return new ValidadorRespuestaDeNotificacionWhatsapp();
            default:
                return null;
        }
    }
}

module.exports = ValidadorRespuestasNotificacionFactory;