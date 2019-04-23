const UtilitariosTiempo = require('../UtilitariosTiempo');
const UtilitariosFecha = require('../UtilitariosFecha');

class VerificadorFechaDePagaComision {
    constructor(fechaInicioTrabajo, fechaActual) {
        this.fechaActual = fechaActual;
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

    esDiaDePaga() {
        if (!UtilitariosFecha.esViernes(this.fechaActual))
            return false;
        let viernesInicioTrabajo = UtilitariosFecha.retrocederHastaUnViernes(this.fechaInicioTrabajo);
        let milisegundosViernesInicioTrabajo = UtilitariosTiempo.obtenerMilisegundos(viernesInicioTrabajo);
        let milisegundosViernesActual = this.fechaActual.getTime();
        return this.esViernesDePaga(milisegundosViernesInicioTrabajo, milisegundosViernesActual)
    }
}

module.exports = VerificadorFechaDePagaComision;