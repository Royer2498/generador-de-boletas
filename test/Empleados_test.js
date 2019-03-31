var expect = require("chai").expect;

import { Empleado } from "../src/Empleados/Empleado";
import { TarjetaHorasTrabajadas } from '../src/Tarjetas/TarjetaHorasTrabajadas';

describe("Empleados", function () {

    it(`el sueldo para un empleado fijo con salario 7000 deberia ser 7000`, function () {
        let empleado = new Empleado("Juan Perez", 123, 'Tiempo completo');
        empleado.establecerSalarioMensual(7000);
        expect(empleado.calcularSalario()).equal(7000);
    });

    it(`el sueldo para un empleado tiempo parcial con salario por hora 100 y que trabajó 13 horas
    deberia ser 1300`, function () {
            let empleado = new Empleado("Juan Perez", 123, 'Tiempo parcial');
            let tarjeta = new TarjetaHorasTrabajadas();
            tarjeta.registrarSesion("2019-03-31", "10:00:00", "13:00:00");
            tarjeta.registrarSesion("2019-03-31", "15:00:00", "20:00:00");
            tarjeta.registrarSesion("2019-04-01", "10:00:00", "15:00:00");
            empleado.establecerSalarioPorHora(100);
            empleado.establecerTarjetaDeHorasTrabajadas(tarjeta);
            expect(empleado.calcularSalario()).equal(1300);
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
