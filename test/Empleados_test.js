var expect = require("chai").expect;

const Empleado = require("../src/Entidades/Empleados/Empleado");
const TarjetasDeHorasTrabajadas = require('../src/Entidades/Tarjetas/TarjetasDeHorasTrabajadas');
const TarjetasDeVentas = require("../src/Entidades/Tarjetas/TarjetasDeVentas");
const CalculadoraTiempoCompleto = require("../src/Entidades/Calculadora salario/CalculadoraTiempoCompleto");
const CalculadoraTiempoParcial = require("../src/Entidades/Calculadora salario/CalculadoraTiempoParcial");
const CalculadoraPorComision = require("../src/Entidades/Calculadora salario/CalculadoraPorComision");

describe("Empleados", function () {

    it(`el sueldo para un empleado fijo con salario 7000 deberia ser 7000`, function () {
        let empleado = new Empleado("Juan Perez", 123, 'Gerente');
        let calculadora = new CalculadoraTiempoCompleto();
        empleado.establecerCalculadora(calculadora);
        empleado.establecerSalarioMensual(7000);
        expect(empleado.calcularSalarioTotal()).equal(7000);
    });

    it(`el sueldo para un empleado tiempo parcial con salario por hora 100 y que trabajó 13 horas
    deberia ser 1300`, function () {
            let calculadora = new CalculadoraTiempoParcial();
            let empleado = new Empleado("Juan Perez", 123, 'Gerente');
            empleado.establecerCalculadora(calculadora);
            let tarjeta = new TarjetasDeHorasTrabajadas();
            tarjeta.registrarSesion("2019-03-31", "10:00:00", "13:00:00");
            tarjeta.registrarSesion("2019-03-31", "15:00:00", "20:00:00");
            tarjeta.registrarSesion("2019-04-01", "10:00:00", "15:00:00");
            empleado.establecerSalarioPorHora(100);
            empleado.establecerTarjetaDeHorasTrabajadas(tarjeta);
            expect(empleado.calcularSalarioTotal()).equal(1300);
        });

    it(`el sueldo para un empleado tiempo parcial con salario por hora 100 y que trabajó 9 horas
    en un dia deberia ser 950`, function () {
            let calculadora = new CalculadoraTiempoParcial();
            let empleado = new Empleado("Juan Perez", 123, 'Gerente');
            empleado.establecerCalculadora(calculadora);
            let tarjeta = new TarjetasDeHorasTrabajadas();
            tarjeta.registrarSesion("2019-03-31", "07:00:00", "13:00:00");
            tarjeta.registrarSesion("2019-03-31", "15:00:00", "18:00:00");
            empleado.establecerSalarioPorHora(100);
            empleado.establecerTarjetaDeHorasTrabajadas(tarjeta);
            expect(empleado.calcularSalarioTotal()).equal(950);
        });


    it(`el sueldo para un empleado por comision con sueldo base 100bs, 22000bs vendidos
    y 10% de comision deberia ser 2300`, function () {
            let empleado = new Empleado("Juan Perez", 123, 'Gerente');
            let calculadora = new CalculadoraPorComision();
            empleado.establecerCalculadora(calculadora);
            empleado.establecerPorcentajeDeComision(10);
            empleado.establecerSueldoBase(100);
            let tarjeta = new TarjetasDeVentas();
            tarjeta.registrarVenta("2019-03-31", "shampoo", 1000);
            tarjeta.registrarVenta("2019-04-01", "arroz", 1000);
            tarjeta.registrarVenta("2019-04-01", "papa", 20000);
            empleado.establecerTarjetaVentas(tarjeta);
            expect(empleado.calcularSalarioTotal()).equal(2300);
        });
});
