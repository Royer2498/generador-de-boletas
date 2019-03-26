import { Empleado } from "./Empleado";

export class EmpleadoTiempoCompleto extends Empleado {
    constructor(nombre, salario, cargo) {
        super(nombre, salario, cargo);
    }

    calcularSalario() {
        return this.salario.monto;
    }
}