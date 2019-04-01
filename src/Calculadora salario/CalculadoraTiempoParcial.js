import { TarjetaHorasTrabajadas } from '../Tarjetas/TarjetaHorasTrabajadas';

export class CalculadoraTiempoParcial {
    constructor() {
        this.salarioPorHora = 0;
        this.tarjetaHorasTrabajadas = new TarjetaHorasTrabajadas();
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