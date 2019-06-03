class ValidadorRespuestaDeNotificacionFacebook{

    constructor(){}

    validar(respuesta){
        return { success: true, message: "Notificacion enviada correctamente por Facebook" };
    }
}

module.exports = ValidadorRespuestaDeNotificacionFacebook;