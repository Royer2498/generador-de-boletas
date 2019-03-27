import { Empleado } from "./Empleado";
import { CalculadoraTiempoParcial } from "./CalculadoraTiempoParcial";

export class EmpleadoTiempoParcial extends Empleado {
    constructor(nombre, salario, cargo, horasTrabajadas) {
        super(nombre, salario, cargo);
        this.horasTrabajadas = horasTrabajadas;
        this.calculadora = new CalculadoraTiempoParcial();
    }

    calcularSalario() {
        return this.calculadora.calcularSalario(this);
    }
}