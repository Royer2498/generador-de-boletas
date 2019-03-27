export class CalculadoraTiempoParcial {
    constructor() {
    }

    calcularSalario(empleado) {
        return empleado.salario.monto * empleado.horasTrabajadas;

    }
}