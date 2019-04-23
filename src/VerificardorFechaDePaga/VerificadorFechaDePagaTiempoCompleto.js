const UtilitariosFecha = require('../UtilitariosFecha');

class VerificadorFechaDePagaTiempoCompleto {
    constructor(fechaActual) {
        this.fechaActual = fechaActual;
    }

    esDiaDePaga() {
        return UtilitariosFecha.obtenerUltimoDiaHabilDelMes(this.fechaActual) == this.fechaActual.getDate();
    }
}

module.exports = VerificadorFechaDePagaTiempoCompleto;