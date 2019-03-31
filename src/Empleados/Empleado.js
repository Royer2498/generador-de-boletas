export class Empleado {

  constructor(nombre, ci, salario) {
    this.nombre = nombre;
    this.ci = ci;
    this.salario = salario;
  }

  set calculadoraSalario(calculadoraSalario) {
    this.calculadoraSalario = calculadoraSalario;
  }

  calcularSalario() {
    throw new Error("clase abstracta");
  }
}
