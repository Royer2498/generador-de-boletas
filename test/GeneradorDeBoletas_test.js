var expect = require("chai").expect;
const request = require('request');

const GeneradorDeBoletas = require("../src/Boleta de pago/GeneradorDeBoletas");

describe("BoletasDePagoTest", function () {

  it(`Para un array de tres empleados si genereamos las boletas de pago para todos los empleados, la boleta del primer empleado (Juan Perez)
        deberia ser la correspondiente`, async function () {
      let generador = new GeneradorDeBoletas();
      await generador.inicializarConexion();
      var boletasGeneradas = generador.generarBoletas();
      let fechaActualConFormato = String(new Date()).slice(0, 15);
      let boletaImpresa = `BOLETA DE PAGO
    Empleado: Juan Perez
    Cargo: Gerente
    Salario: 10000 Bolivianos
    Metodo de pago: Deposito
    Fecha de emision: ${fechaActualConFormato}`;
      expect(boletasGeneradas[0]).eq(boletaImpresa);
    });

  xit(`Para un array de tres empleados si genereamos las boletas de pago para todos los empleados, la boleta del primer empleado (Carlos Torres)
      deberia ser la correspondiente`, function () {
        let generador = new GeneradorDeBoletas();
      var boletasGeneradas = generador.generarBoletas();
      let fechaActualConFormato = String(new Date()).slice(0, 15);
      let boletaImpresa = `BOLETA DE PAGO
    Empleado: Carlos Torres
    Cargo: Presidente
    Salario: 1000 Bolivianos
    Metodo de pago: Deposito
    Fecha de emision: ${fechaActualConFormato}`;
      expect(boletasGeneradas[1]).eq(boletaImpresa);
    });

  xit(`Para un array de tres empleados si genereamos las boletas de pago para todos los empleados, la boleta del primer empleado (Pedro Perez)
      deberia ser la correspondiente`, function () {
      let generador = new GeneradorDeBoletas();
      var boletasGeneradas = generador.generarBoletas();
      let fechaActualConFormato = String(new Date()).slice(0, 15);
      let boletaImpresa = `BOLETA DE PAGO
    Empleado: Pedro Perez
    Cargo: Vice Presidente
    Salario: 2300 Bolivianos
    Metodo de pago: Deposito
    Fecha de emision: ${fechaActualConFormato}`;
      expect(boletasGeneradas[2]).eq(boletaImpresa);
    });
});
