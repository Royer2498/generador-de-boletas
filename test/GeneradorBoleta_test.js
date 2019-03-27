var expect = require("chai").expect;

import { GeneradorBoleta } from "../GeneradorBoleta";
import { EmpleadoTiempoCompleto } from "../EmpleadoTiempoCompleto";
import { EmpleadoTiempoParcial } from "../EmpleadoTiempoParcial";
import { EmpleadoPorComision } from "../EmpleadoPorComision";
import { Salario } from "../Salario.js";

describe("BoletaDePagoTest", function () {
  it(`si se genera una boleta para Juan Perez que recibe 10000 bolivianos de salario fijo,
 es Gerente y la moneda es Bs, la boleta deberia proveer toda la informacion`, function () {
      let salario = new Salario(10000, "Bolivianos");
      let empleado = new EmpleadoTiempoCompleto("Juan Perez", salario, "Gerente");
      let boletaPago = new GeneradorBoleta(empleado, "Cochabamba");
      let fechaActualConFormato = String(new Date()).slice(0, 15);
      let boletaImpresa = `BOLETA DE PAGO
    Empleado: Juan Perez
    Cargo: Gerente
    Salario: 10000 Bolivianos
    Fecha de emision: ${fechaActualConFormato}`;
      expect(boletaPago.imprimir()).equal(boletaImpresa);
    });

  it(`si se genera una boleta para Pedro Paramo que recibe 100 bolivianos por hora y trabajo 100 horas,
  es sub gerente y la moneda es Bs, la boleta deberia proveer toda la informacion`, function () {
      let salario = new Salario(100, "Bolivianos");
      let empleado = new EmpleadoTiempoParcial("Pedro Paramo", salario, "Sub gerente", 100);
      let boletaPago = new GeneradorBoleta(empleado, "Cochabamba");
      let fechaActualConFormato = String(new Date()).slice(0, 15);
      let boletaImpresa = `BOLETA DE PAGO
    Empleado: Pedro Paramo
    Cargo: Sub gerente
    Salario: 10000 Bolivianos
    Fecha de emision: ${fechaActualConFormato}`;
      expect(boletaPago.imprimir()).equal(boletaImpresa);
    });

  it(`si se genera una boleta para Fernando Gonzalez que recibe 100 bolivianos de monto base, un 10% de
  comision y 1000 bs en ventas, es comisionado de ventas y la moneda es Bs, la boleta deberia proveer
  toda la informacion`, function () {
      let salario = new Salario(100, "Bolivianos")
      let empleado = new EmpleadoPorComision("Fernando Gonzalez", salario, "Comisionado de ventas", 10, 1000);
      let boletaPago = new GeneradorBoleta(empleado, "Cochabamba");
      let fechaActualConFormato = String(new Date()).slice(0, 15);
      let boletaImpresa = `BOLETA DE PAGO
    Empleado: Fernando Gonzalez
    Cargo: Comisionado de ventas
    Salario: 200 Bolivianos
    Fecha de emision: ${fechaActualConFormato}`;
      expect(boletaPago.imprimir()).equal(boletaImpresa);
    });


});
