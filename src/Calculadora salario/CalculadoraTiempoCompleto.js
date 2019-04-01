export class CalculadoraTiempoCompleto {
    constructor() {
        this.salarioMensual = 0;
    }

    establecerSalarioMensual(salarioMensual) {
        this.salarioMensual = salarioMensual;
    }

    calcularSalario() {
        return this.salarioMensual;
    }
}