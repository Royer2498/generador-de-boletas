export class CalculadoraPorComision {
    constructor() {
        this.montoVentas = 0;
        this.porcentaje = 0;
        this.sueldoBase = 0;
    }

    aniadirMontoVendido(monto) {
        this.montoVentas += monto;
    }

    calcularSalario() {
        return this.sueldoBase + this.porcentaje * this.montoVentas / 100;
    }
}


