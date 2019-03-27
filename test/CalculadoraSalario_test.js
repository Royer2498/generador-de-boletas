var expect = require("chai").expect;

import { Salario } from "../Salario.js";
import { EmpleadoTiempoCompleto } from "../EmpleadoTIempoCompleto";
import { EmpleadoTiempoParcial } from "../EmpleadoTiempoParcial";
import { EmpleadoPorComision } from "../EmpleadoPorComision";
import { CalculadoraTiempoCompleto } from '../CalculadoraTiempoCompleto';

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
        expect(empleado.calcularSalario()).equal(1000);
    });

    it(`el sueldo para un empleado por comision con sueldo base 100, 1000bs vendidos
    y 10% de comision deberia ser 200`, function () {
            let salario = new Salario(100, "Bs")
            let empleado = new EmpleadoPorComision("Juan Perez", salario, "Gerente", 10, 1000);
            expect(empleado.calcularSalario()).equal(200);
        });

});
