const UtilitariosFecha = require('../Utilitarios/UtilitariosFecha');

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
            let primerDiaSiguienteMes = new Date(this.fechaInicioTrabajo.getFullYear(), this.fechaInicioTrabajo.getMonth() + 1, 1);
            let primerDiaMesActual = new Date(this.fechaInicioTrabajo.getFullYear(), this.fechaInicioTrabajo.getMonth(), 1)
            let diasHabilesDesdeInicioTrabajo = UtilitariosFecha.calcularDiasHabiles(this.fechaInicioTrabajo, primerDiaSiguienteMes);
            let diasHabilesDeTodoElMes = UtilitariosFecha.calcularDiasHabiles(primerDiaMesActual, primerDiaSiguienteMes);
            let pagaPorDia = this.salarioMensual / diasHabilesDeTodoElMes;
            return diasHabilesDesdeInicioTrabajo * pagaPorDia;
        }
        else
            return this.salarioMensual;
    }

    

    

}

module.exports = CalculadoraTiempoCompleto;