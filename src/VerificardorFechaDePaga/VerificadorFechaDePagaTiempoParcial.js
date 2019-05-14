const UtilitariosFecha = require('../UtilitariosFecha');

class VerificadorFechaDePagaTiempoParcial {

    constructor() {
    }

    esDiaDePaga(fecha) {
        return UtilitariosFecha.esViernes(fecha);
    }
}

module.exports = VerificadorFechaDePagaTiempoParcial;