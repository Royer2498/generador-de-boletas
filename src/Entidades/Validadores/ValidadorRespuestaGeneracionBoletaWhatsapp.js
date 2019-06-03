

class ValidadorRespuestaGeneracionBoletaWhatsapp{

    constructor(){

    }

    validar(respuesta){
        return { success: true, message: "boleta(s) generada(s) exitosamente por Whatsapp" };
    }   

}

module.exports = ValidadorRespuestaGeneracionBoletaWhatsapp;