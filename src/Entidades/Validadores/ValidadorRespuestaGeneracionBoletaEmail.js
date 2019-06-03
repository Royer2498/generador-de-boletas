
class ValidadorRespuestaGeneracionBoletaEmail{

    constructor(){

    }

    validar(respuesta){
        if (respuesta.rejected.length == 0)
            return { success: true, message: "boleta(s) generada(s) exitosamente" };
        else
            return { success: false, message: "operacion fallida" };
    }

}

module.exports = ValidadorRespuestaGeneracionBoletaEmail;