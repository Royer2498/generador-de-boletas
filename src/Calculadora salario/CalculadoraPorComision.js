import { TarjetaVentas } from "../Tarjetas/TarjetaVentas";

export class CalculadoraPorComision {
    constructor() {
        this.porcentaje = 0;
        this.sueldoBase = 0;
        this.tarjetaVentas = new TarjetaVentas();
    }

    calcularSalario() {
        return this.sueldoBase + this.porcentaje * this.tarjetaVentas.calcularMontoTotal() / 100;
    }
}


