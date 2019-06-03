const ValidadorRespuestaDeNotificacionEmail = require('../Validadores/ValidadorRespuestaDeNotificacionEmail');
const ValidadorRespuestaDeNotificacionFacebook = require('../Validadores/ValidadorRespuestaDeNotificacionFacebook');
const ValidadorRespuestaDeNotificacionWhatsapp = require('../Validadores/ValidadorRespuestaDeNotificacionWhatsapp');

class ValidadorRespuestasNotificacionFactory{
    
    constructor(){}

    static obtenerValidador(metodoEnvio){
        switch(metodoEnvio){
            case "Email":
                return new ValidadorRespuestaDeNotificacionEmail();
            case "Facebook":
                return new ValidadorRespuestaDeNotificacionFacebook();
            case "WhatsApp":
                return new ValidadorRespuestaDeNotificacionWhatsapp();
            default:
                return null;
        }
    }
}

module.exports = ValidadorRespuestasNotificacionFactory;