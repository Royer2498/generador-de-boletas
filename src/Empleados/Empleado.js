const CalculadoraTiempoCompleto = require('../Calculadora salario/CalculadoraTiempoCompleto');
const CalculadoraTiempoParcial = require('../Calculadora salario/CalculadoraTiempoParcial');
const CalculadoraPorComision =require('../Calculadora salario/CalculadoraPorComision');

class Empleado {

  constructor(nombre, ci, cargo) {
    this.nombre = nombre;
    this.ci = ci;
    this.cargo = cargo;
    this.calculadoraSalario = null;
  }

  establecerCalculadora(calculadora) {
    this.calculadoraSalario = calculadora;
  }

  establecerSalarioMensual(salario) {
    if (this.calculadoraSalario instanceof CalculadoraTiempoCompleto)
      this.calculadoraSalario.establecerSalarioMensual(salario);
    else
      throw new Error("El empleado no es de tiempo completo");
  }

  establecerSalarioPorHora(salario) {
    if (this.calculadoraSalario instanceof CalculadoraTiempoParcial)
      this.calculadoraSalario.establecerSalarioPorHora(salario);
    else
      throw new Error("El empleado no es de tiempo parcial");
  }

  establecerTarjetaDeHorasTrabajadas(tarjeta) {
    if (this.calculadoraSalario instanceof CalculadoraTiempoParcial)
      this.calculadoraSalario.establecerTarjetaHorasTrabajadas(tarjeta);
    else
      throw new Error("El empleado no es de tiempo parcial");
  }

  establecerSueldoBase(sueldoBase) {
    if (this.calculadoraSalario instanceof CalculadoraPorComision)
      this.calculadoraSalario.establecerSueldoBase(sueldoBase);
    else
      throw new Error("El empleado no es por comision");
  }

  establecerTarjetaVentas(tarjeta) {
    if (this.calculadoraSalario instanceof CalculadoraPorComision)
      this.calculadoraSalario.establecerTarjetaVentas(tarjeta);
    else
      throw new Error("El empleado no es por comision");
  }

  establecerPorcentajeDeComision(porcentaje) {
    if (this.calculadoraSalario instanceof CalculadoraPorComision)
      this.calculadoraSalario.establecerPorcentaje(porcentaje);
    else
      throw new Error("El empleado no es por comision");
  }

  calcularSalario() {
    return this.calculadoraSalario.calcularSalario();
  }
}

module.exports = Empleado;