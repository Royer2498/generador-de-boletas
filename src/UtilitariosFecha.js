class UtilitariosFecha {
    constructor() {
    }

    static incrementarUnDia(fecha) {
        let nuevaFecha = new Date(fecha);
        nuevaFecha.setDate(nuevaFecha.getDate() + 1);
        return nuevaFecha;
    }

    static retrocederUnDia(fecha) {
        let nuevaFecha = new Date(fecha);
        nuevaFecha.setDate(nuevaFecha.getDate() - 1);
        return nuevaFecha;
    }

    static retrocederNDias(fecha, dias) {
        let nuevaFecha = new Date(fecha);
        nuevaFecha.setDate(nuevaFecha.getDate() - dias);
        return nuevaFecha;
    }

    static sonFechasIguales(fecha1, fecha2) {
        return fecha1.getFullYear() == fecha2.getFullYear() && fecha1.getMonth() == fecha2.getMonth() && fecha1.getDate() == fecha2.getDate();
    }

    static esDiaHabil(fecha) {
        console.log(fecha.getDay())
        return fecha.getDay() >= 1 && fecha.getDay() <= 5;
    }

    static esViernes(fecha) {
        return fecha.getDay() == 5;
    }

    static calcularDiasHabiles(fechaInicio, fechaFin) {
        var diasHabiles = 0;
        let fechaInicial = new Date(fechaInicio);
        while (!this.sonFechasIguales(fechaInicial, fechaFin)) {
            if (this.esDiaHabil(fechaInicial))
                diasHabiles = diasHabiles + 1;
            fechaInicial = this.incrementarUnDia(fechaInicial);

        }
        return diasHabiles;
    }

    static obtenerFechaActualConFormato() {
        var fechaActual = String(new Date());
        var fechaConFormato = fechaActual.slice(0, 15);
        return fechaConFormato;
    }

    static laFechaEstaEnIntervalo(fecha, fechaInicio, fechaFin) {
        return new Date(fecha) >= new Date(fechaInicio) && new Date(fecha) <= new Date(fechaFin);
    }

    static retrocederHastaUnDiaHabil(fecha) {
        let fechaDiaHabil = new Date(fecha);
        while (!this.esDiaHabil(fechaDiaHabil))
            fechaDiaHabil = this.retrocederUnDia(fechaDiaHabil);
        return fechaDiaHabil;
    }

    static retrocederHastaUnViernes(fecha) {
        let fechaViernes = new Date(fecha);
        while (!this.esViernes(fechaViernes))
            fechaViernes = this.retrocederUnDia(fechaViernes);
        return fechaViernes;
    }

    static obtenerUltimoDiaHabilDelMes(fecha) {
        let fechaUltimoDiaMes = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);
        let fechaUltimoDiaHabilMes = this.retrocederHastaUnDiaHabil(fechaUltimoDiaMes);
        return fechaUltimoDiaHabilMes.getDate();
    }
}

module.exports = UtilitariosFecha;