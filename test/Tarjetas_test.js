var expect = require("chai").expect;

const TarjetasDeHorasTrabajadas = require("../src/Entidades/Tarjetas/TarjetasDeHorasTrabajadas");
const TarjetasDeVentas = require("../src/Entidades/Tarjetas/TarjetasDeVentas");

describe("Empleados", function () {

    it(`si no tenemos registros de horas trabajadas, las horas calculadas deberian ser 0`, function () {
        let tarjeta = new TarjetasDeHorasTrabajadas();
        expect(tarjeta.calcularHoras()).equal(0);
    });

    it(`si registramos tres registros de: 
    31/3/2019 hora entrada: 10, hora salida: 13
    31/3/2019 hora entrada: 15, hora salida: 20
    01/4/2019 hora entrada: 10, hora salida: 15
    las horas calculadas deberian ser 13`, function () {
            let tarjeta = new TarjetasDeHorasTrabajadas();
            tarjeta.registrarSesion("2019-03-31", "10:00:00", "13:00:00");
            tarjeta.registrarSesion("2019-03-31", "15:00:00", "20:00:00");
            tarjeta.registrarSesion("2019-04-01", "10:00:00", "15:00:00");
            expect(tarjeta.calcularHoras()).equal(13);
        });

    it(`si registramos tres registros de: 
    31/3/2019 hora entrada: 10, hora salida: 13
    31/3/2019 hora entrada: 15, hora salida: 20
    01/4/2019 hora entrada: 10, hora salida: 15
    las horas calculadas deberian ser 8 en el intervalo desde 1/3/2019 hasta 31/3/2019`, function () {
            let tarjeta = new TarjetasDeHorasTrabajadas();
            tarjeta.registrarSesion("2019-03-31", "10:00:00", "13:00:00");
            tarjeta.registrarSesion("2019-03-31", "15:00:00", "20:00:00");
            tarjeta.registrarSesion("2019-04-01", "10:00:00", "15:00:00");
            expect(tarjeta.calcularHorasPorIntervalo("2019-03-01", "2019-03-31")).equal(8);
        });

    it(`si no tenemos registros de ventas, el monto total deberia ser 0`, function () {
        let tarjeta = new TarjetasDeVentas();
        expect(tarjeta.calcularMontoTotal()).equal(0);
    });

    it(`si registramos tres registros de: 
    31/3/2019 nombre: shampoo, monto vendido: 1000
    01/4/2019 nombre: arroz, monto vendido: 1
    01/4/2019 nombre: papa, monto vendido: 20000
    el monto total deberia ser 21001`, function () {
            let tarjeta = new TarjetasDeVentas();
            tarjeta.registrarVenta("2019-03-31", "shampoo", 1000);
            tarjeta.registrarVenta("2019-04-01", "arroz", 1);
            tarjeta.registrarVenta("2019-04-01", "papa", 20000);
            expect(tarjeta.calcularMontoTotal()).equal(21001);
        });

    it(`si registramos tres registros de: 
    31/3/2019 nombre: shampoo, monto vendido: 1000
    01/4/2019 nombre: arroz, monto vendido: 1
    01/4/2019 nombre: papa, monto vendido: 20000
    en el intervalo del 01/4/2019 al 30/4/2019, el monto total deberia ser 20001`, function () {
            let tarjeta = new TarjetasDeVentas();
            tarjeta.registrarVenta("2019-03-31", "shampoo", 1000);
            tarjeta.registrarVenta("2019-04-01", "arroz", 1);
            tarjeta.registrarVenta("2019-04-01", "papa", 20000);
            expect(tarjeta.calcularMontoTotalPorIntervalo("2019-04-01", "2019-04-30")).equal(20001);
        });

});
