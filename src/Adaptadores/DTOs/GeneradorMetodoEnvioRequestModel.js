const MetodoDeEnvioFactory = require('../../Entidades/Factories/MetodoDeEnvioFactory');

class GeneradorMetodoEnvioRequestModel {

    constructor(consulta) {
        this.consulta = consulta;
    }

    obtenerRequestModel() {
        let requestModel = {
            metodoEnvio: this.consulta.params.metodoEnvio,
            notificacion: this.consulta.body
        }
        return requestModel;
    }
}

module.exports = GeneradorMetodoEnvioRequestModel;