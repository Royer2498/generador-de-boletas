import { CalculadoraTiempoCompleto } from '../Calculadora salario/CalculadoraTiempoCompleto';
import { CalculadoraTiempoParcial } from '../Calculadora salario/CalculadoraTiempoParcial';
import { CalculadoraPorComision } from '../Calculadora salario/CalculadoraPorComision';


export class Empleado {

  constructor(nombre, ci, tipo, cargo) {
    this.nombre = nombre;
    this.ci = ci;
    this.tipo = tipo;
    this.cargo = cargo;
    this.calculadoraSalario = this.obtenerCalculadora();
  }



  obtenerCalculadora() {
    switch (this.tipo) {
      case 'Tiempo completo':
        return new CalculadoraTiempoCompleto();
      case 'Tiempo parcial':
        return new CalculadoraTiempoParcial();
      case 'Por comision':
        return new CalculadoraPorComision();
      default:
        throw new Error("Tipo de calculadora no existente");
    }
  }

  establecerSalarioMensual(salario) {
    if (this.tipo == 'Tiempo completo')
      this.calculadoraSalario.salarioMensual = salario;
    else
      throw new Error("El empleado no es de tiempo completo");
  }

  establecerSalarioPorHora(salario) {
    if (this.tipo == 'Tiempo parcial')
      this.calculadoraSalario.salarioPorHora = salario;
    else
      throw new Error("El empleado no es de tiempo parcial");
  }

  establecerHorasTrabajadas(horasTrabajadas) {
    if (this.tipo == 'Tiempo parcial')
      this.calculadoraSalario.horasTrabajadas = horasTrabajadas;
    else
      throw new Error("El empleado no es de tiempo parcial");
  }

  establecerSueldoBase(sueldoBase) {
    if (this.tipo == 'Por comision')
      this.calculadoraSalario.sueldoBase = sueldoBase;
    else
      throw new Error("El empleado no es por comision");
  }

  aniadirMontoVendido(monto) {
    if (this.tipo == 'Por comision')
      this.calculadoraSalario.aniadirMontoVendido(monto);
    else
      throw new Error("El empleado no es por comision");
  }

  establecerPorcentajeDeComision(porcentaje) {
    if (this.tipo == 'Por comision')
      this.calculadoraSalario.porcentaje = porcentaje;
    else
      throw new Error("El empleado no es por comision");
  }

  calcularSalario() {
    return this.calculadoraSalario.calcularSalario();
  }
}
