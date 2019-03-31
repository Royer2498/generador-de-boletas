var expect = require("chai").expect;

import { GeneradorBoleta } from "../src/Boleta de pago/GeneradorBoleta";
import { Empleado } from "../src/Empleados/Empleado";
import { TarjetaHorasTrabajadas } from '../src/Tarjetas/TarjetaHorasTrabajadas';

describe("BoletaDePagoTest", function () {
  it(`si se genera una boleta para Juan Perez que recibe 10000 bolivianos de salario fijo,
 es Gerente y la moneda es Bs, la boleta deberia proveer toda la informacion`, function () {
      let empleado = new Empleado("Juan Perez", 123, "Tiempo completo", "Gerente");
      empleado.establecerSalarioMensual(10000);
      let boletaPago = new GeneradorBoleta(empleado, "Cochabamba");
      let fechaActualConFormato = String(new Date()).slice(0, 15);
      let boletaImpresa = `BOLETA DE PAGO
    Empleado: Juan Perez
    Cargo: Gerente
    Salario: 10000 Bolivianos
    Fecha de emision: ${fechaActualConFormato}`;
      expect(boletaPago.imprimir()).eq(boletaImpresa);
    });

  it(`si se genera una boleta para Pedro Paramo que recibe 100 bolivianos por hora y trabajo 10 horas,
  es sub gerente y la moneda es Bs, la boleta deberia proveer toda la informacion`, function () {
      let empleado = new Empleado("Juan Perez", 123, "Tiempo parcial", "Gerente");
      empleado.establecerSalarioPorHora(100);
      let tarjeta = new TarjetaHorasTrabajadas();
      tarjeta.registrarSesion("2019-03-31", "15:00:00", "20:00:00");
      tarjeta.registrarSesion("2019-04-01", "10:00:00", "15:00:00");
      empleado.establecerTarjetaDeHorasTrabajadas(tarjeta);
      let boletaPago = new GeneradorBoleta(empleado, "Cochabamba");
      let fechaActualConFormato = String(new Date()).slice(0, 15);
      let boletaImpresa = `BOLETA DE PAGO
    Empleado: Juan Perez
    Cargo: Gerente
    Salario: 1000 Bolivianos
    Fecha de emision: ${fechaActualConFormato}`;
      expect(boletaPago.imprimir()).eq(boletaImpresa);
    });

  it(`si se genera una boleta para Fernando Gonzalez que recibe 100 bolivianos de monto base, un 10% de
  comision y 1000 bs en ventas, es comisionado de ventas y la moneda es Bs, la boleta deberia proveer
  toda la informacion`, function () {
      let empleado = new Empleado("Juan Perez", 123, "Por comision", "Gerente");
      empleado.establecerSueldoBase(100);
      empleado.establecerPorcentajeDeComision(10);
      empleado.aniadirMontoVendido(1000);
      let boletaPago = new GeneradorBoleta(empleado, "Cochabamba");
      let fechaActualConFormato = String(new Date()).slice(0, 15);
      let boletaImpresa = `BOLETA DE PAGO
    Empleado: Juan Perez
    Cargo: Gerente
    Salario: 200 Bolivianos
    Fecha de emision: ${fechaActualConFormato}`;
      expect(boletaPago.imprimir()).eq(boletaImpresa);
    });


});
