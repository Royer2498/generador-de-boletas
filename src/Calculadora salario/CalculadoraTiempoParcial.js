import { TarjetaHorasTrabajadas } from '../Tarjetas/TarjetaHorasTrabajadas';

export class CalculadoraTiempoParcial {
    constructor() {
        this.salarioPorHora = 0;
        this.tarjetaHorasTrabajadas = new TarjetaHorasTrabajadas();
    }

    calcularSalario() {
        return this.salarioPorHora * this.tarjetaHorasTrabajadas.calcularHoras();
    }
}