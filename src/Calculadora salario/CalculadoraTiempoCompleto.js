class CalculadoraTiempoCompleto {
    constructor() {
        this.salarioMensual = 0;
        this.fechaInicioTrabajo =  null;
    }

    establecerSalarioMensual(salarioMensual) {
        this.salarioMensual = salarioMensual;
    }

    establecerFechaInicioTrabajo(fechaInicioTrabajo) {
        this.fechaInicioTrabajo = fechaInicioTrabajo;
    }

    calcularSalarioTotal() {
        return this.salarioMensual;
    }

    calcularSalario(fechaActual) {
        if (fechaActual.getMonth() == this.fechaInicioTrabajo.getMonth()) {
            let diasHabiles = this.calcularDiasHabiles(this.fechaInicioTrabajo);
            let diasHabilesDeTodoElMes = this.calcularDiasHabiles(new Date(this.fechaInicioTrabajo.getFullYear(), this.fechaInicioTrabajo.getMonth(), 1));
            let pagaPorDia = this.salarioMensual / diasHabilesDeTodoElMes;
            return diasHabiles * pagaPorDia;
        }
        else
            return this.salarioMensual;
    }

    calcularDiasHabiles(fechaInicio) {
        var diasHabiles = 0;
        let fechaPrimerDiaSiguienteMes = new Date(fechaInicio.getFullYear(), fechaInicio.getMonth() + 1, 1);
        let fechaIn = new Date(fechaInicio);
        while (!this.sonFechasIguales(fechaIn, fechaPrimerDiaSiguienteMes)) {
            if (this.esDiaHabil(fechaIn.getDay()))
                diasHabiles = diasHabiles + 1;
            fechaIn = this.incrementarUnDia(fechaIn);

        }
        return diasHabiles;
    }

    sonFechasIguales(fecha1, fecha2) {
        return fecha1.getFullYear() == fecha2.getFullYear() &&  fecha1.getMonth() == fecha2.getMonth() && fecha1.getDate() == fecha2.getDate();
    }

    esDiaHabil(diaSemana) {
        return diaSemana >= 1 && diaSemana <= 5;
    }

    incrementarUnDia(fecha) {
        let nuevaFecha = new Date(fecha);
        nuevaFecha.setDate(nuevaFecha.getDate() + 1);
        return nuevaFecha;
    }

}

module.exports = CalculadoraTiempoCompleto;