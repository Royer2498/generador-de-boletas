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

    calcularSalario() {
        let horasExtra =  this.tarjetaHorasTrabajadas.obtenerHorasExtra();
        let horasLaborales = this.tarjetaHorasTrabajadas.calcularHoras() - horasExtra;
        return this.salarioPorHora * horasLaborales + this.salarioPorHora * 1.5 * horasExtra;
    }
}

module.exports = CalculadoraTiempoParcial;