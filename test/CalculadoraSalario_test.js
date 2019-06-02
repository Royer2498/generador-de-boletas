var expect = require("chai").expect;
const CalculadoraTiempoCompleto = require('../src/Entidades/Calculadora salario/CalculadoraTiempoCompleto');
const CalculadoraTiempoParcial = require('../src/Entidades/Calculadora salario/CalculadoraTiempoParcial');
const CalculadoraPorComision = require('../src/Entidades/Calculadora salario/CalculadoraPorComision');
const TarjetasDeHorasTrabajadas = require('../src/Entidades/Tarjetas/TarjetasDeHorasTrabajadas');
const TarjetasDeVentas = require("../src/Entidades/Tarjetas/TarjetasDeVentas");

describe("Calculadora salario", function () {
    it("el sueldo para un empleado fijo con salario 7000 deberia ser 7000", function () {
        let calculadora = new CalculadoraTiempoCompleto();
        calculadora.establecerSalarioMensual(7000);
        expect(calculadora.calcularSalarioTotal()).equal(7000);
    });

    it("el sueldo para un empleado tiempo parcial con salario 100 y que trabajó 10 horas deberia ser 1000", function () {
        let calculadora = new CalculadoraTiempoParcial();
        calculadora.establecerSalarioPorHora(100);
        let tarjeta = new TarjetasDeHorasTrabajadas();
        tarjeta.registrarSesion("2019-03-31", "15:00:00", "20:00:00");
        tarjeta.registrarSesion("2019-04-01", "10:00:00", "15:00:00");
        calculadora.establecerTarjetaHorasTrabajadas(tarjeta);
        expect(calculadora.calcularSalarioTotal()).equal(1000);
    });

    it(`el sueldo para un empleado por comision con sueldo base 100, 22000bs vendidos
    y 10% de comision deberia ser 2300`, function () {
            let calculadora = new CalculadoraPorComision();
            calculadora.establecerSueldoBase(100);
            calculadora.establecerPorcentaje(10);
            let tarjeta = new TarjetasDeVentas();
            tarjeta.registrarVenta("2019-03-31", "shampoo", 1000);
            tarjeta.registrarVenta("2019-04-01", "arroz", 1000);
            tarjeta.registrarVenta("2019-04-01", "papa", 20000);
            calculadora.establecerTarjetaVentas(tarjeta);
            expect(calculadora.calcularSalarioTotal()).equal(2300);
        });

    it(`si es dia de paga de abril, para un empleado que comenzó a trabajar en marzo y su salario
    mensual es 10000, su salario a pagar deberia ser 10000`, function () {
            let calculadora = new CalculadoraTiempoCompleto();
            let fechaInicioTrabajo = new Date("03-15-2019");
            let fechaActual = new Date("04-30-2019");
            calculadora.establecerFechaInicioTrabajo(fechaInicioTrabajo);
            calculadora.establecerSalarioMensual(10000);
            expect(calculadora.calcularSalario(fechaActual)).equal(10000);
        });

    it(`si es dia de paga de abril, para un empleado que comenzó a trabajar el 15 de abril y su salario
    mensual es 22000, su salario a pagar deberia ser 12000`, function () {
            let calculadora = new CalculadoraTiempoCompleto();
            let fechaInicioTrabajo = new Date("04-15-2019");
            let fechaActual = new Date("04-30-2019");
            calculadora.establecerFechaInicioTrabajo(fechaInicioTrabajo);
            calculadora.establecerSalarioMensual(22000);
            expect(calculadora.calcularSalario(fechaActual)).equal(12000);
        });

    it(`si es 19 de abril (dia de paga), para un empleado a tiempo parcial que comenzó a trabajar el
    16 de abril y su sueldo por hora es 100, su salario a pagar deberia ser 1400`, function () {
            let calculadora = new CalculadoraTiempoParcial();
            calculadora.establecerSalarioPorHora(100);
            let tarjeta = new TarjetasDeHorasTrabajadas();
            tarjeta.registrarSesion("2019-04-16", "15:00:00", "20:00:00");
            tarjeta.registrarSesion("2019-04-17", "15:00:00", "19:00:00");
            tarjeta.registrarSesion("2019-04-18", "15:00:00", "18:00:00");
            tarjeta.registrarSesion("2019-04-19", "15:00:00", "17:00:00");
            calculadora.establecerTarjetaHorasTrabajadas(tarjeta);
            let fechaActual = new Date("04-19-2019");
            expect(calculadora.calcularSalario(fechaActual)).equal(1400);
        });

    it(`si es 19 de abril (dia de paga), para un empleado a tiempo parcial que comenzó a trabajar el
    1 de abril y su sueldo por hora es 100, su salario a pagar deberia ser 1400`, function () {
            let calculadora = new CalculadoraTiempoParcial();
            calculadora.establecerSalarioPorHora(100);
            let tarjeta = new TarjetasDeHorasTrabajadas();
            tarjeta.registrarSesion("2019-04-12", "15:00:00", "20:00:00");
            tarjeta.registrarSesion("2019-04-11", "15:00:00", "20:00:00");
            tarjeta.registrarSesion("2019-04-16", "15:00:00", "20:00:00");
            tarjeta.registrarSesion("2019-04-17", "15:00:00", "19:00:00");
            tarjeta.registrarSesion("2019-04-18", "15:00:00", "18:00:00");
            tarjeta.registrarSesion("2019-04-19", "15:00:00", "17:00:00");
            calculadora.establecerTarjetaHorasTrabajadas(tarjeta);
            let fechaActual = new Date("04-19-2019");
            expect(calculadora.calcularSalario(fechaActual)).equal(1400);
        });

    it(`si es dia de paga (19 de abril), para un empleado por comision que comenzó a trabajar el 10
    de abril, su sueldo base es 100, y su porcentaje de comision es 10 su salario a pagar deberia ser 2300`,
        function () {
            let calculadora = new CalculadoraPorComision();
            calculadora.establecerSueldoBase(100);
            calculadora.establecerPorcentaje(10);
            let tarjeta = new TarjetasDeVentas();
            tarjeta.registrarVenta("2019-04-10", "shampoo", 1000);
            tarjeta.registrarVenta("2019-04-17", "arroz", 1000);
            tarjeta.registrarVenta("2019-04-18", "papa", 20000);
            calculadora.establecerTarjetaVentas(tarjeta);
            let fechaActual = new Date("04-19-2019");
            expect(calculadora.calcularSalario(fechaActual)).equal(2300);
        });

    it(`si es dia de paga (19 de abril), para un empleado por comision que comenzó a trabajar el 1
    de abril, su sueldo base es 100, y su porcentaje de comision es 10 su salario a pagar deberia ser 2300`,
        function () {
            let calculadora = new CalculadoraPorComision();
            calculadora.establecerSueldoBase(100);
            calculadora.establecerPorcentaje(10);
            let tarjeta = new TarjetasDeVentas();
            tarjeta.registrarVenta("2019-03-10", "shampoo", 1000);
            tarjeta.registrarVenta("2019-04-05", "shampoo", 1000);
            tarjeta.registrarVenta("2019-04-10", "shampoo", 1000);
            tarjeta.registrarVenta("2019-04-17", "arroz", 1000);
            tarjeta.registrarVenta("2019-04-18", "papa", 20000);
            calculadora.establecerTarjetaVentas(tarjeta);
            let fechaActual = new Date("04-19-2019");
            expect(calculadora.calcularSalario(fechaActual)).equal(2300);
        });
});
