const MetodoDeEnvioFactory = require('../../Entidades/Factories/MetodoDeEnvioFactory')
const ValidadorRespuestasNotificacionFactory = require('../../Entidades/Factories/ValidadorRespuestasNotificacionFactory');

class NotificarBoletaDePagoInteractor{

    constructor(){
    }

    async enviar(requestModel){
        let metodoEnvio = MetodoDeEnvioFactory.obtenerMetodoDeEnvio(requestModel.metodoEnvio);
        let respuestaDeEnvio = await metodoEnvio.enviar(requestModel.notificacion);
        return {respuestaEnvio: respuestaDeEnvio, validador: ValidadorRespuestasNotificacionFactory.obtenerValidador(requestModel.metodoEnvio)};
    }

}

module.exports = NotificarBoletaDePagoInteractor;