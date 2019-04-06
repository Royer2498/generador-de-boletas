import { TarjetasDeHorasTrabajadas } from '../Tarjetas/TarjetasDeHorasTrabajadas';

export class CalculadoraTiempoParcial {
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