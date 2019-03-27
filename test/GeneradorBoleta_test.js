var expect = require("chai").expect;

import { GeneradorBoleta } from "../GeneradorBoleta";
import { EmpleadoTiempoCompleto } from "../EmpleadoTiempoCompleto";
import { Salario } from "../Salario.js";

describe("BoletaDePagoTest", function() {
  it(`si se genera una boleta para Juan Perez que recibe 10000 bolivianos de salario fijo como salario
  y es Gerente la moneda de la boleta deberia proveer toda la informacion`, function() {
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

  
});
