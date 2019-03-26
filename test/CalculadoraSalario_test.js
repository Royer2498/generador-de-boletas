var assert = require("assert");
var expect = require("chai").expect;
var should = require("chai").should();

import { GeneradorBoleta } from "../GeneradorBoleta";
import { Empleado } from "../Empleado.js";
import { Salario } from "../Salario.js";

describe("Calculadora salario", function () {
    it("el sueldo para un empleado fijo con salario 7000 deberia ser 7000", function () {
        let salario = new Salario(7000, "Bs")
        let empleado = new Empleado("Juan Perez", salario, "Gerente");
        expect(empleado.calcularSalario()).equal(7000);
    });

});
