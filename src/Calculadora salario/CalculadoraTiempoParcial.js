const TarjetasDeHorasTrabajadas = require('../Tarjetas/TarjetasDeHorasTrabajadas');
const UtilitariosFecha = require('../UtilitariosFecha');

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
        let anteriorViernes = UtilitariosFecha.retrocederNDias(fechaActual, 7);
        let horasExtra = this.tarjetaHorasTrabajadas.obtenerHorasExtraPorIntervalo(anteriorViernes, fechaActual);
        let horasLaborales = this.tarjetaHorasTrabajadas.calcularHorasPorIntervalo(anteriorViernes, fechaActual) - horasExtra;
        return this.salarioPorHora * horasLaborales + this.salarioPorHora * 1.5 * horasExtra;
    }

}

module.exports = CalculadoraTiempoParcial;