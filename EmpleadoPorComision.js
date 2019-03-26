import { Empleado } from "./Empleado";

export class EmpleadoPorComision extends Empleado {
    constructor(nombre, salario, cargo, porcentajeComision, montoEnVentas) {
        super(nombre, salario, cargo);
        this.porcentajeComision = porcentajeComision;
        this.montoEnVentas = montoEnVentas;

    }

    calcularSalario() {
        return this.salario.monto + this.porcentajeComision * this.montoEnVentas / 100;
    }
}