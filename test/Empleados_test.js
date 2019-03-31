var expect = require("chai").expect;

import { Salario } from "../src/Salario.js";
import { Empleado } from "../src/Empleados/Empleado";
import { CalculadoraTiempoCompleto } from '../src/Calculadora salario/CalculadoraTiempoCompleto';
import { CalculadoraTiempoParcial } from '../src/Calculadora salario/CalculadoraTiempoParcial';
import { CalculadoraPorComision } from '../src/Calculadora salario/CalculadoraPorComision';

describe("Empleados", function () {

    it(`el sueldo para un empleado fijo con salario 7000 deberia ser 7000`, function () {
        let empleado = new Empleado("Juan Perez", 123, 'Tiempo completo');
        empleado.establecerSalarioMensual(7000);
        expect(empleado.calcularSalario()).equal(7000);
    });

    it(`el sueldo para un empleado tiempo parcial con salario por hora 100 y que trabajó 10 horas
    deberia ser 1000`, function () {
            let empleado = new Empleado("Juan Perez", 123, 'Tiempo parcial');
            empleado.establecerSalarioPorHora(100);
            empleado.establecerHorasTrabajadas(10);
            expect(empleado.calcularSalario()).equal(1000);
        });

    it(`el sueldo para un empleado por comision con sueldo base 100bs, 1000bs vendidos
    y 10% de comision deberia ser 200`, function () {
            let empleado = new Empleado("Juan Perez", 123, 'Por comision');
            empleado.establecerPorcentajeDeComision(10);
            empleado.establecerSueldoBase(100);
            empleado.aniadirMontoVendido(1000);
            expect(empleado.calcularSalario()).equal(200);
        });
});
