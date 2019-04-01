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
      this.calculadoraSalario.establecerSalarioMensual(salario);
    else
      throw new Error("El empleado no es de tiempo completo");
  }

  establecerSalarioPorHora(salario) {
    if (this.tipo == 'Tiempo parcial')
      this.calculadoraSalario.establecerSalarioPorHora(salario);
    else
      throw new Error("El empleado no es de tiempo parcial");
  }

  establecerTarjetaDeHorasTrabajadas(tarjeta) {
    if (this.tipo == 'Tiempo parcial')
      this.calculadoraSalario.establecerTarjetaHorasTrabajadas(tarjeta);
    else
      throw new Error("El empleado no es de tiempo parcial");
  }

  establecerSueldoBase(sueldoBase) {
    if (this.tipo == 'Por comision')
      this.calculadoraSalario.establecerSueldoBase(sueldoBase);
    else
      throw new Error("El empleado no es por comision");
  }

  establecerTarjetaVentas(tarjeta) {
    if (this.tipo == 'Por comision')
      this.calculadoraSalario.establecerTarjetaVentas(tarjeta);
    else
      throw new Error("El empleado no es por comision");
  }

  establecerPorcentajeDeComision(porcentaje) {
    if (this.tipo == 'Por comision')
      this.calculadoraSalario.establecerPorcentaje(porcentaje);
    else
      throw new Error("El empleado no es por comision");
  }

  calcularSalario() {
    return this.calculadoraSalario.calcularSalario();
  }
}
