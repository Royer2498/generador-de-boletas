class ValidadorRespuestaDeNotificacionWhatsapp{

    constructor(){}

    validar(respuesta){
        return { success: true, message: "Notificacion enviada correctamente por Whatsapp" };
    }

}

module.exports = ValidadorRespuestaDeNotificacionWhatsapp;