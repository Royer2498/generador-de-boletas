const UtilitariosFecha = require('../UtilitariosFecha');

class VerificadorFechaDePagaTiempoCompleto {
    constructor() {
    }

    esDiaDePaga(fecha) {
        return UtilitariosFecha.obtenerUltimoDiaHabilDelMes(fecha) == fecha.getDate();
    }

    pruebits() {
        console.log("gggggggggggggggggggggggggggggggggggggg")
    }
}

module.exports = VerificadorFechaDePagaTiempoCompleto;