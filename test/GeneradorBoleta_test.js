var assert = require("assert");
var expect = require("chai").expect;
var should = require("chai").should();

import { GeneradorBoleta } from "../GeneradorBoleta";
import { Empleado } from "../Empleado.js";


describe("BoletaDePagoTest", function() {
  
  it("se genera la boleta con monto 0 para empleados con sueldo fijo", function() {
    let empleado = new Empleado("JUAN PEREZ",100);  
    let boletaPago = new GeneradorBoleta(empleado);
    expect(boletaPago.monto).equal(100);
  });

  
  
});
