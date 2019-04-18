class VerificadorFechaDePagaTiempoParcial {

    constructor(fechaActual) {
        this.diaDeLaSemana = fechaActual.getDay();
    }

    esViernes() {
        if (this.diaDeLaSemana === 5)
            return true;
        return false;
    }

    esDiaDePaga() {
        if (this.esViernes())
            return true;
        return false;
    }
}

module.exports = VerificadorFechaDePagaTiempoParcial;