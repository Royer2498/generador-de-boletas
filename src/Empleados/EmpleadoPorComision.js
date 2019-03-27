import { Empleado } from "./Empleado";
import { CalculadoraPorComision } from "../Calculadora salario/CalculadoraPorComision";

export class EmpleadoPorComision extends Empleado {
    constructor(nombre, salario, cargo, porcentajeComision, montoEnVentas) {
        super(nombre, salario, cargo);
        this.porcentajeComision = porcentajeComision;
        this.montoEnVentas = montoEnVentas;
        this.calculadora = new CalculadoraPorComision();
    }

    calcularSalario() {
        return this.calculadora.calcularSalario(this);
    }
}