export class VerificadorFechaDePagaTiempoCompleto {
    constructor(fechaActual) {
        this.diaDelMes = fechaActual.getDate();
        this.diaDeLaSemana = fechaActual.getDay();
        this.mes = fechaActual.getMonth();
        this.anio = fechaActual.getFullYear();
    }

    obtenerUltimoDiaHabilDelMes() {
        let fechaUltimoDiaMes = new Date(this.anio, this.mes + 1, 0);
        let ultimoDiaDeLaSemana = fechaUltimoDiaMes.getDay();
        let ultimoDiaDelMes = fechaUltimoDiaMes.getDate();
        while (!this.esDiaHabil(ultimoDiaDeLaSemana)) {
            ultimoDiaDeLaSemana = this.irUnDiaHaciaAtras(ultimoDiaDeLaSemana);
            ultimoDiaDelMes = this.irUnDiaHaciaAtras(ultimoDiaDelMes);
        }
        return ultimoDiaDelMes;
    }

    irUnDiaHaciaAtras(dia) {
        if (dia == 0)
            dia = 6
        else
            dia = dia - 1
        return dia;
    }

    esDiaHabil(dia) {
        if (dia != 0 && dia != 6)
            return true
        return false;
    }

    esDiaDePaga() {
        if (this.obtenerUltimoDiaHabilDelMes() == this.diaDelMes)
            return true;
        return false;
    }
}