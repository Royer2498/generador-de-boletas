export class Empleado {

  constructor(nombre, salario, cargo) {
    this.nombre = nombre;
    this.salario = salario;
    this.cargo = cargo;
  }

  calcularSalario() {
    throw new Error("clase abstracta");
  }
}
