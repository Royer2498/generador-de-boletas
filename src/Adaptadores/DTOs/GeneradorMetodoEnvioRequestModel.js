class GeneradorMetodoEnvioRequestModel {

    constructor(consulta) {
        this.consulta = consulta;
    }

    obtenerRequestModel() {
        return { metodoDeEnvio: this.consulta.params.metodoEnvio, notificacion: this.consulta.body };
    }
}

module.exports = GeneradorMetodoEnvioRequestModel;