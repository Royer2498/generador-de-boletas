import { Empleado } from "./Empleado";

export class EmpleadoTiempoParcial extends Empleado {
    constructor(nombre, salario, cargo, horasTrabajadas) {
        super(nombre, salario, cargo);
        this.horasTrabajadas = horasTrabajadas;
    }

    calcularSalario() {
        console.log(this.salario.monto, this.horasTrabajadas);
        return this.salario.monto * this.horasTrabajadas;
    }
}