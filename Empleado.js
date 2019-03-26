export class Empleado {

  constructor(nombre, salario, cargo) {
    this.nombre = nombre;
    this.salario = salario;
    this.cargo = cargo;
  }

  calcularSalario() {
    return this.salario.monto;
  }
}
