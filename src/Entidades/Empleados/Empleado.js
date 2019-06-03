const CalculadoraTiempoCompleto = require('../Calculadora salario/CalculadoraTiempoCompleto');
const CalculadoraTiempoParcial = require('../Calculadora salario/CalculadoraTiempoParcial');
const CalculadoraPorComision = require('../Calculadora salario/CalculadoraPorComision');

class Empleado {

  constructor(nombre, ci, cargo, email) {
    this.nombre = nombre;
    this.ci = ci;
    this.cargo = cargo;
    this.email = email;
    this.calculadoraSalario = null;
    this.verificadorFechaDePaga = null;
    this.metodoDePago = null;
    this.metodoDePagoCadena = "";
    this.metodoDeEnvio = {};
    this.metodoDeEnvioCadena = "";
    this.sindicato = {};
    this.nombreSindicato = "";
  }

  esMiDiaDePaga(fecha) {
    return this.verificadorFechaDePaga.esDiaDePaga(fecha);
  }

  establecerMetodoDePago(metodo) {
    this.metodoDePago = metodo;
    this.metodoDePagoCadena = this.metodoDePago.constructor.name;
  }

  establecerMetodoDeEnvio(metodo) {
    this.metodoDeEnvio = metodo;
    this.metodoDeEnvioCadena = this.metodoDeEnvio.constructor.name;
  }

  establecerSindicato(sindicato) {
    this.sindicato = sindicato;
    this.nombreSindicato = this.sindicato.constructor.name;
  }

  obtenerMetodoDePago() {
    return this.metodoDePagoCadena;
  }

  establecerVerificadorDiaDePaga(verificador) {
    this.verificadorFechaDePaga = verificador;
  }

  establecerCalculadora(calculadora) {
    this.calculadoraSalario = calculadora;
  }

  establecerSalarioMensual(salario) {
    this.calculadoraSalario.establecerSalarioMensual(salario);
  }

  establecerFechaInicioTrabajo(fecha) {
    this.calculadoraSalario.establecerFechaInicioTrabajo(fecha);
  }

  establecerSalarioPorHora(salario) {
    this.calculadoraSalario.establecerSalarioPorHora(salario);
  }

  establecerTarjetaDeHorasTrabajadas(tarjeta) {
    this.calculadoraSalario.establecerTarjetaHorasTrabajadas(tarjeta);
  }

  establecerSueldoBase(sueldoBase) {
    this.calculadoraSalario.establecerSueldoBase(sueldoBase);
  }

  establecerTarjetaVentas(tarjeta) {
    this.calculadoraSalario.establecerTarjetaVentas(tarjeta);
  }

  establecerPorcentajeDeComision(porcentaje) {
    this.calculadoraSalario.establecerPorcentaje(porcentaje);
  }

  calcularSalario(fecha) {
    return this.calculadoraSalario.calcularSalario(fecha) * this.obtenerDescuentoSindicato();
  }


  obtenerDescuentoSindicato() {
    if (this.nombreSindicato != "") {
      return ((100 - this.sindicato.obtenerPorcentajeDescuento()) / 100);
    }
    else {
      return 1;
    }
  }

  calcularSalarioTotal() {
    return this.calculadoraSalario.calcularSalarioTotal();
  }

}

module.exports = Empleado;