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
        return this.salarioPorHora * this.tarjetaHorasTrabajadas.calcularHoras();
    }
}

module.exports = CalculadoraTiempoParcial;