const TarjetasDeHorasTrabajadas = require('../Tarjetas/TarjetasDeHorasTrabajadas');

class CalculadoraTiempoParcial {
    constructor() {
        this.salarioPorHora = 0;
        this.tarjetaHorasTrabajadas = new TarjetasDeHorasTrabajadas();
    }

    establecerSalarioPorHora(salarioPorHora) {
        this.salarioPorHora = salarioPorHora;
    }

    establecerTarjetaHorasTrabajadas(tarjetaHorasTrabajadas) {
        this.tarjetaHorasTrabajadas = tarjetaHorasTrabajadas;
    }

    calcularSalarioTotal() {
        let horasExtra = this.tarjetaHorasTrabajadas.obtenerHorasExtra();
        let horasLaborales = this.tarjetaHorasTrabajadas.calcularHoras() - horasExtra;
        return this.salarioPorHora * horasLaborales + this.salarioPorHora * 1.5 * horasExtra;
    }

    calcularSalario(fechaActual) {
        let anteriorViernes = this.retrocederNDias(fechaActual, 7);
        let horasExtra = this.tarjetaHorasTrabajadas.obtenerHorasExtraPorIntervalo(anteriorViernes, fechaActual);
        let horasLaborales = this.tarjetaHorasTrabajadas.calcularHorasPorIntervalo(anteriorViernes, fechaActual) - horasExtra;
        return this.salarioPorHora * horasLaborales + this.salarioPorHora * 1.5 * horasExtra;
    }

    retrocederNDias(fecha, dias) {
        let nuevaFecha = new Date(fecha);
        nuevaFecha.setDate(nuevaFecha.getDate() - dias);
        return nuevaFecha;
    }

}

module.exports = CalculadoraTiempoParcial;