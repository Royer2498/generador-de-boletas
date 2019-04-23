const UtilitariosFecha = require('../UtilitariosFecha');

class VerificadorFechaDePagaTiempoParcial {

    constructor(fechaActual) {
        this.fechaActual = fechaActual;
    }

    esDiaDePaga() {
        return UtilitariosFecha.esViernes(this.fechaActual);
    }
}

module.exports = VerificadorFechaDePagaTiempoParcial;