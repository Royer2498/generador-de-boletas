export class VerificadorFechaDePagaComision {
    constructor(fechaInicioTrabajo, fechaActual) {
        this.fechaActual = fechaActual;
        this.fechaInicioTrabajo = fechaInicioTrabajo;
        this.anioInicioTrabajo = this.fechaInicioTrabajo.getFullYear();
        this.mesInicioTrabajo = this.fechaInicioTrabajo.getMonth();
        this.diaActualDeLaSemana = this.fechaActual.getDay();
    }

    esViernes(dia) {
        if (dia == 5)
            return true;
        return false;
    }

    retrocederUnDiaDeLaSemana(dia) {
        if (dia == 0)
            dia = 6
        else
            dia = dia - 1
        return dia;
    }

    retrodecerUnDiaDelMes(dia) {
        if (dia === 1) {
            dia = this.obtenerUltimoDiaDelAnteriorMes()
            this.retrocederMes();
        }
        else
            dia = dia - 1
        return dia;
    }

    retrocederMes() {
        if (this.mesInicioTrabajo === 0) {
            this.mesInicioTrabajo = 11;
            this.retrocederAnio();
        }
        else
            this.mesInicioTrabajo = this.mesInicioTrabajo - 1;
    }

    retrocederAnio() {
        this.anioInicioTrabajo = this.anioInicioTrabajo - 1;
    }

    obtenerUltimoDiaDelAnteriorMes() {
        return new Date(this.fechaActual.getFullYear(), this.fechaActual.getMonth(), 0).getDate();
    }

    retrocederHastaUnViernes(diaDeLaSemana, diaDelMes) {
        while (!this.esViernes(diaDeLaSemana)) {
            diaDeLaSemana = this.retrocederUnDiaDeLaSemana(diaDeLaSemana);
            diaDelMes = this.retrodecerUnDiaDelMes(diaDelMes);
        }
        return diaDelMes;
    }

    esViernesDePaga(milisegundosViernesInicioTrabajo, milisegundosViernesActual) {
        let diferenciaDeMilisegundos = milisegundosViernesActual - milisegundosViernesInicioTrabajo
        let diferenciaDeDias = this.convertirMilisegundosADias(diferenciaDeMilisegundos)
        if (this.esUnViernesIntercalado(diferenciaDeDias))
            return true;
        return false;
    }

    esUnViernesIntercalado(diferenciaDeDias) {
        return diferenciaDeDias % 14 === 0;
    }

    convertirMilisegundosADias(diferenciaDeMilisegundos) {
        return Math.ceil(diferenciaDeMilisegundos / (1000 * 3600 * 24));
    }

    obtenerMilisegundosViernesInicioTrabajo(viernesInicioTrabajo) {
        return new Date(this.anioInicioTrabajo, this.mesInicioTrabajo, viernesInicioTrabajo).getTime();
    }

    esDiaDePaga() {
        if (!this.esViernes(this.diaActualDeLaSemana))
            return false;
        let diaDelMesInicioTrabajo = this.fechaInicioTrabajo.getDate();
        let diaDeLaSemanaInicioTrabajo = this.fechaInicioTrabajo.getDay();
        let viernesInicioTrabajo = this.retrocederHastaUnViernes(diaDeLaSemanaInicioTrabajo, diaDelMesInicioTrabajo);
        let milisegundosViernesInicioTrabajo = this.obtenerMilisegundosViernesInicioTrabajo(viernesInicioTrabajo);
        let milisegundosViernesActual = this.fechaActual.getTime();
        return this.esViernesDePaga(milisegundosViernesInicioTrabajo, milisegundosViernesActual)
    }
}