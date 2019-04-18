var expect = require("chai").expect;

const GeneradorBoleta = require("../src/Boleta de pago/GeneradorBoleta");
const Empleado = require("../src/Empleados/Empleado");
const TarjetasDeHorasTrabajadas = require('../src/Tarjetas/TarjetasDeHorasTrabajadas');
const TarjetasDeVentas = require("../src/Tarjetas/TarjetasDeVentas");
const CalculadoraTiempoCompleto = require('../src/Calculadora salario/CalculadoraTiempoCompleto');
const CalculadoraTiempoParcial = require('../src/Calculadora salario/CalculadoraTiempoParcial');
const CalculadoraPorComision = require('../src/Calculadora salario/CalculadoraPorComision');


describe("BoletaDePagoTest", function () {
  it(`si se genera una boleta para Juan Perez que recibe 10000 bolivianos de salario fijo,
 es Gerente y la moneda es Bs, la boleta deberia proveer toda la informacion`, function () {
      let calculadora = new CalculadoraTiempoCompleto();
      let empleado = new Empleado("Juan Perez", 123, "Gerente");
      empleado.establecerCalculadora(calculadora);
      empleado.establecerSalarioMensual(10000);
      let fechaActualConFormato = String(new Date()).slice(0, 15);
      let boletaImpresa = `BOLETA DE PAGO
    Empleado: Juan Perez
    Cargo: Gerente
    Salario: 10000 Bolivianos
    Fecha de emision: ${fechaActualConFormato}`;
      expect(GeneradorBoleta.obtener(empleado)).eq(boletaImpresa);
    });

  it(`si se genera una boleta para Pedro Paramo que recibe 100 bolivianos por hora y trabajo 10 horas,
  es sub gerente y la moneda es Bs, la boleta deberia proveer toda la informacion`, function () {
      let empleado = new Empleado("Juan Perez", 123, "Gerente");
      let calculadora = new CalculadoraTiempoParcial();
      empleado.establecerCalculadora(calculadora);
      empleado.establecerSalarioPorHora(100);
      let tarjeta = new TarjetasDeHorasTrabajadas();
      tarjeta.registrarSesion("2019-03-31", "15:00:00", "20:00:00");
      tarjeta.registrarSesion("2019-04-01", "10:00:00", "15:00:00");
      empleado.establecerTarjetaDeHorasTrabajadas(tarjeta);
      let fechaActualConFormato = String(new Date()).slice(0, 15);
      let boletaImpresa = `BOLETA DE PAGO
    Empleado: Juan Perez
    Cargo: Gerente
    Salario: 1000 Bolivianos
    Fecha de emision: ${fechaActualConFormato}`;
      expect(GeneradorBoleta.obtener(empleado)).eq(boletaImpresa);
    });

  it(`si se genera una boleta para Fernando Gonzalez que recibe 100 bolivianos de monto base, un 10% de
  comision y 22000 bs en ventas, es comisionado de ventas y la moneda es Bs, la boleta deberia proveer
  toda la informacion`, function () {
      let empleado = new Empleado("Juan Perez", 123, "Gerente");
      let calculadora = new CalculadoraPorComision();
      empleado.establecerCalculadora(calculadora);
      empleado.establecerSueldoBase(100);
      empleado.establecerPorcentajeDeComision(10);
      let tarjeta = new TarjetasDeVentas();
      tarjeta.registrarVenta("2019-03-31", "shampoo", 1000);
      tarjeta.registrarVenta("2019-04-01", "arroz", 1000);
      tarjeta.registrarVenta("2019-04-01", "papa", 20000);
      empleado.establecerTarjetaVentas(tarjeta);
      let fechaActualConFormato = String(new Date()).slice(0, 15);
      let boletaImpresa = `BOLETA DE PAGO
    Empleado: Juan Perez
    Cargo: Gerente
    Salario: 2300 Bolivianos
    Fecha de emision: ${fechaActualConFormato}`;
      expect(GeneradorBoleta.obtener(empleado)).eq(boletaImpresa);
    });


});
