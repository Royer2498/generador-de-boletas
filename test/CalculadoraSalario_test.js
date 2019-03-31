var expect = require("chai").expect;

import { CalculadoraTiempoCompleto } from '../src/Calculadora salario/CalculadoraTiempoCompleto';
import { CalculadoraTiempoParcial } from '../src/Calculadora salario/CalculadoraTiempoParcial';
import { CalculadoraPorComision } from '../src/Calculadora salario/CalculadoraPorComision';
import { TarjetaHorasTrabajadas } from '../src/Tarjetas/TarjetaHorasTrabajadas';

describe("Calculadora salario", function () {
    it("el sueldo para un empleado fijo con salario 7000 deberia ser 7000", function () {
        let calculadora = new CalculadoraTiempoCompleto();
        calculadora.salarioMensual = 7000;
        expect(calculadora.calcularSalario()).equal(7000);
    });

    it("el sueldo para un empleado tiempo parcial con salario 100 y que trabajó 10 horas deberia ser 1000", function () {
        let calculadora = new CalculadoraTiempoParcial();
        calculadora.salarioPorHora = 100;
        let tarjeta = new TarjetaHorasTrabajadas();
        tarjeta.registrarSesion("2019-03-31", "15:00:00", "20:00:00");
        tarjeta.registrarSesion("2019-04-01", "10:00:00", "15:00:00");
        calculadora.tarjetaHorasTrabajadas = tarjeta;
        expect(calculadora.calcularSalario()).equal(1000);
    });

    it(`el sueldo para un empleado por comision con sueldo base 100, 1000bs vendidos
    y 10% de comision deberia ser 200`, function () {
            let calculadora = new CalculadoraPorComision();
            calculadora.sueldoBase = 100;
            calculadora.porcentaje = 10;
            calculadora.aniadirMontoVendido(1000);
            expect(calculadora.calcularSalario()).equal(200);
        });

});
