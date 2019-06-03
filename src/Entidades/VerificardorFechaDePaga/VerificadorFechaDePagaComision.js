const UtilitariosTiempo = require('../Utilitarios/UtilitariosTiempo');
const UtilitariosFecha = require('../Utilitarios/UtilitariosFecha');

class VerificadorFechaDePagaComision {
    constructor(fechaInicioTrabajo) {
        this.fechaInicioTrabajo = fechaInicioTrabajo;
    }

    esViernesDePaga(milisegundosViernesInicioTrabajo, milisegundosViernesActual) {
        let diferenciaDeMilisegundos = milisegundosViernesActual - milisegundosViernesInicioTrabajo;
        let diferenciaDeDias = UtilitariosTiempo.convertirMilisegundosADias(diferenciaDeMilisegundos);
        return this.esUnViernesIntercalado(diferenciaDeDias);
    }

    esUnViernesIntercalado(diferenciaDeDias) {
        return diferenciaDeDias % 14 === 0;
    }

    esDiaDePaga(fecha) {
        if (!UtilitariosFecha.esViernes(fecha))
            return false;
        let viernesInicioTrabajo = UtilitariosFecha.retrocederHastaUnViernes(this.fechaInicioTrabajo);
        let milisegundosViernesInicioTrabajo = UtilitariosTiempo.obtenerMilisegundos(viernesInicioTrabajo);
        let milisegundosViernesActual = fecha.getTime();
        return this.esViernesDePaga(milisegundosViernesInicioTrabajo, milisegundosViernesActual)
    }
}

module.exports = VerificadorFechaDePagaComision;