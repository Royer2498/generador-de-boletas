const MetodoDeEnvioFactory = require('../../Entidades/Factories/MetodoDeEnvioFactory')


class NotificarBoletaDePagoInteractor{

    constructor(){
    }

    async enviar(requestModel){
        let metodoDeEnvio = MetodoDeEnvioFactory.obtenerMetodoDeEnvio(requestModel.metodoDeEnvio);
        let respuesta = await metodoDeEnvio.enviar(requestModel.notificacion);
        return respuesta;
    }

}

module.exports = NotificarBoletaDePagoInteractor;