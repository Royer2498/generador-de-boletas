var expect = require("chai").expect;

import { Empleado } from "../src/Empleados/Empleado";
import { CalculadoraTiempoCompleto } from '../src/Calculadora salario/CalculadoraTiempoCompleto';
import { CalculadoraTiempoParcial } from '../src/Calculadora salario/CalculadoraTiempoParcial';
import { CalculadoraPorComision } from '../src/Calculadora salario/CalculadoraPorComision';

describe("Calculadora salario", function () {
    it("el sueldo para un empleado fijo con salario 7000 deberia ser 7000", function () {
        let calculadora = new CalculadoraTiempoCompleto();
        calculadora.salarioMensual = 7000;
        expect(calculadora.calcularSalario()).equal(7000);
    });

    it("el sueldo para un empleado tiempo parcial con salario 100 y que trabajó 10 horas deberia ser 1000", function () {
    });

    it(`el sueldo para un empleado por comision con sueldo base 100, 1000bs vendidos
    y 10% de comision deberia ser 200`, function () {
        });

});
