var assert = require("assert");
var expect = require("chai").expect;
var should = require("chai").should();

import { GeneradorBoleta } from "../GeneradorBoleta";
import { Empleado } from "../Empleado.js";


describe("BoletaDePagoTest", function() {
  
  it("si se genera una boleta con monto 100 para un empleado con sueldo fijo el monto de la boleta deberia ser 100", function() {
    let empleado = new Empleado("JUAN PEREZ",100);  
    let boletaPago = new GeneradorBoleta(empleado);
    expect(boletaPago.monto).equal(100);
  });

  it("si se genera una boleta para Juan Perez el contribuyente de la boleta deberia ser Juan Perez", function() {
    let empleado = new Empleado("JUAN PEREZ",100);  
    let boletaPago = new GeneradorBoleta(empleado);
    expect(boletaPago.contribuyente).equal("JUAN PEREZ");
  });

  






  
});
