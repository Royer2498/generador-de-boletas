import { Empleado } from "./Empleado";
import { CalculadoraTiempoCompleto } from "./CalculadoraTiempoCompleto";

export class EmpleadoTiempoCompleto extends Empleado {
    constructor(nombre, salario, cargo) {
        super(nombre, salario, cargo);
        this.calculadora = new CalculadoraTiempoCompleto();
    }

    calcularSalario() {
        return this.calculadora.calcularSalario(this);
    }
}