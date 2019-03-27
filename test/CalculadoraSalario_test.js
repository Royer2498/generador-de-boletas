var expect = require("chai").expect;

import { Salario } from "../src/Salario.js";
import { EmpleadoTiempoCompleto } from "../src/Empleados/EmpleadoTIempoCompleto";
import { EmpleadoTiempoParcial } from "../src/Empleados/EmpleadoTiempoParcial";
import { EmpleadoPorComision } from "../src/Empleados/EmpleadoPorComision";
import { CalculadoraTiempoCompleto } from '../src/Calculadora salario/CalculadoraTiempoCompleto';
import { CalculadoraTiempoParcial } from '../src/Calculadora salario/CalculadoraTiempoParcial';
import { CalculadoraPorComision } from '../src/Calculadora salario/CalculadoraPorComision';

describe("Calculadora salario", function () {
    it("el sueldo para un empleado fijo con salario 7000 deberia ser 7000", function () {
        let salario = new Salario(7000, "Bs")
        let empleado = new EmpleadoTiempoCompleto("Juan Perez", salario, "Gerente");
        let calculadoraTiempoCompleto = new CalculadoraTiempoCompleto();
        expect(calculadoraTiempoCompleto.calcularSalario(empleado)).equal(7000);
    });

    it("el sueldo para un empleado tiempo parcial con salario 100 y que trabajó 10 horas deberia ser 1000", function () {
        let salario = new Salario(100, "Bs")
        let empleado = new EmpleadoTiempoParcial("Juan Perez", salario, "Gerente", 10);
        let calculadoraTiempoParcial = new CalculadoraTiempoParcial();
        expect(calculadoraTiempoParcial.calcularSalario(empleado)).equal(1000);
    });

    it(`el sueldo para un empleado por comision con sueldo base 100, 1000bs vendidos
    y 10% de comision deberia ser 200`, function () {
            let salario = new Salario(100, "Bs")
            let empleado = new EmpleadoPorComision("Juan Perez", salario, "Gerente", 10, 1000);
            let calculadoraPorComision = new CalculadoraPorComision();
            expect(calculadoraPorComision.calcularSalario(empleado)).equal(200);
        });

});
