class GeneradorCIRequestModel {

    constructor(consulta) {
        this.consulta = consulta;
    }

    obtenerRequestModel() {
        return { ci: parseInt(this.consulta.params.ci) };
    }
}

module.exports = GeneradorCIRequestModel;