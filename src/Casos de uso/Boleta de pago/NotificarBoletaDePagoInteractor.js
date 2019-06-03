const MetodoDeEnvioFactory = require('../../Entidades/Factories/MetodoDeEnvioFactory')


class NotificarBoletaDePagoInteractor{

    constructor(requestModel){
        this.requestModel = requestModel;
    }

    async enviar(){
        let metodoDeEnvio = MetodoDeEnvioFactory.obtenerMetodoDeEnvio(this.requestModel.metodoDeEnvio);
        let respuesta = await metodoDeEnvio.enviar(this.requestModel.notificacion);
        return respuesta;
    }

}

module.exports = NotificarBoletaDePagoInteractor;