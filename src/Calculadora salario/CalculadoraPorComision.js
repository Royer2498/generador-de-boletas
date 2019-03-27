export class CalculadoraPorComision {
    constructor() {
    }

    calcularSalario(empleado) {
        return empleado.salario.monto + empleado.porcentajeComision * empleado.montoEnVentas / 100;
    }
}
