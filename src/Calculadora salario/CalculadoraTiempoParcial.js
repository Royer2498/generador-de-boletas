export class CalculadoraTiempoParcial {
    constructor() {
        this.salarioPorHora = 0;
        this.horasTrabajadas = 0;
    }

    calcularSalario() {
        return this.salarioPorHora * this.horasTrabajadas;

    }
}