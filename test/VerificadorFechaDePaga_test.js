var expect = require("chai").expect;

const VerificadorFechaDePagaTiempoCompleto = require('../src/Entidades/VerificardorFechaDePaga/VerificadorFechaDePagaTiempoCompleto');
const VerificadorFechaDePagaTiempoParcial = require('../src/Entidades/VerificardorFechaDePaga/VerificadorFechaDePagaTiempoParcial');
const VerificadorFechaDePagaComision = require('../src/Entidades/VerificardorFechaDePaga/VerificadorFechaDePagaComision');

describe("Verificar fecha de paga", function () {
    it(`Si le pasamos 29 de marzo de 2019 (Viernes) al verificador de fecha de paga de 
    empleado de tiempo completo deberia devolver true`, function () {
            let verificador = new VerificadorFechaDePagaTiempoCompleto()
            expect(verificador.esDiaDePaga(new Date(2019, 2, 29))).eq(true);
        });
    it(`Si le pasamos 8 de enero de 2019 (Jueves) al verificador de fecha de paga de 
        empleado de tiempo completo deberia devolver false`, function () {
            let verificador = new VerificadorFechaDePagaTiempoCompleto()
            expect(verificador.esDiaDePaga(new Date(2019, 0, 8))).eq(false);
        });

    it(`Si le pasamos 30 de marzo de 2019 (Sabado) al verificador de fecha de paga de 
        empleado de tiempo completo deberia devolver false`, function () {
            let verificador = new VerificadorFechaDePagaTiempoCompleto()
            expect(verificador.esDiaDePaga(new Date(2019, 2, 30))).eq(false);
        });

    it(`Si le pasamos 22 de marzo de 2019 (Viernes) al verificador de fecha de paga de 
        empleado de tiempo parcial deberia devolver true`, function () {
            let verificador = new VerificadorFechaDePagaTiempoParcial()
            expect(verificador.esDiaDePaga(new Date(2019, 2, 22))).eq(true);
        });

    it(`Si le pasamos 14 de marzo de 2019 (Jueves) al verificador de fecha de paga de 
        empleado de tiempo parcial deberia devolver true`, function () {
            let verificador = new VerificadorFechaDePagaTiempoParcial()
            expect(verificador.esDiaDePaga(new Date(2019, 2, 14))).eq(false);
        });

    it(`Si le pasamos 14 de marzo de 2019 (Jueves) como fecha de inicio
        22 de marzo de 2019(Viernes) como fecha actual al verificador de fecha de paga de 
        empleado por comision deberia devolver true`, function () {
            let verificador = new VerificadorFechaDePagaComision(new Date(2019, 2, 14))
            expect(verificador.esDiaDePaga(new Date(2019, 2, 22))).eq(true);
        });

    it(`Si le pasamos 7 de marzo de 2019 (Jueves) como fecha de inicio
        22 de marzo de 2019(Viernes) como fecha actual al verificador de fecha de paga de 
        empleado por comision deberia devolver false`, function () {
            let verificador = new VerificadorFechaDePagaComision(new Date(2019, 2, 7))
            expect(verificador.esDiaDePaga(new Date(2019, 2, 22))).eq(false);
        });

    it(`Si le pasamos 7 de marzo de 2019 (Jueves) como fecha de inicio
        29 de marzo de 2019(Viernes) como fecha actual al verificador de fecha de paga de 
        empleado por comision deberia devolver true`, function () {
            let verificador = new VerificadorFechaDePagaComision(new Date(2019, 2, 7))
            expect(verificador.esDiaDePaga(new Date(2019, 2, 29))).eq(true);
        });

    it(`Si le pasamos 1 de enero de 2019 (Martes) como fecha de inicio
        11 de enero de 2019(Viernes) como fecha actual al verificador de fecha de paga de 
        empleado por comision deberia devolver true`, function () {
            let verificador = new VerificadorFechaDePagaComision(new Date(2019, 0, 1))
            expect(verificador.esDiaDePaga(new Date(2019, 0, 11))).eq(true);
        });

    it(`Si le pasamos 28 de diciembre de 2018 (Viernes) como fecha de inicio
        11 de enero de 2019(Viernes) como fecha actual al verificador de fecha de paga de 
        empleado por comision deberia devolver true`, function () {
            let verificador = new VerificadorFechaDePagaComision(new Date(2018, 11, 28))
            expect(verificador.esDiaDePaga(new Date(2019, 0, 11))).eq(true);
        });
})