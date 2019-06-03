

class ValidadorRespuestaGeneracionBoletaFacebook{

    constructor(){

    }

    validar(respuesta){
        return { success: true, message: "boleta(s) generada(s) exitosamente por Facebook" };
    }

}

module.exports = ValidadorRespuestaGeneracionBoletaFacebook;