const UtilitariosFecha = require('../Utilitarios/UtilitariosFecha');

class VerificadorFechaDePagaTiempoCompleto {
    constructor() {
    }

    esDiaDePaga(fecha) {
        return UtilitariosFecha.obtenerUltimoDiaHabilDelMes(fecha) == fecha.getDate();
    }

}

module.exports = VerificadorFechaDePagaTiempoCompleto;