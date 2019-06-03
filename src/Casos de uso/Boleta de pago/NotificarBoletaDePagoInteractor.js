const MetodoDeEnvioFactory = require('../../Entidades/Factories/MetodoDeEnvioFactory')


class NotificarBoletaDePagoInteractor{

    constructor(requestModel){
        this.requestModel = requestModel;
    }

    async enviar(){
        console.log("==================");
        console.log(this.requestModel.metodoDeEnvio);
        let metodoDeEnvio = MetodoDeEnvioFactory.obtenerMetodoDeEnvio(this.requestModel.metodoDeEnvio);
        console.log(metodoDeEnvio);
        let respuesta = await metodoDeEnvio.enviar(this.requestModel.notificacion);
        console.log(respuesta);
        return respuesta;
    }


}

module.exports = NotificarBoletaDePagoInteractor;