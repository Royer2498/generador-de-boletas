
class ValidadorRespuestaDeNotificacionEmail{

    constructor(){
    }

    validar(respuesta){
        if (respuesta.rejected.length == 0)
            return { success: true, message: "Notificacion enviada correctamente por email" };
        else
            return { success: false, message: "Notificacion no enviada" };
    }
}

module.exports = ValidadorRespuestaDeNotificacionEmail;