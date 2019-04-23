var expect = require("chai").expect;

const VerificadorFechaDePagaTiempoCompleto = require('../src/VerificardorFechaDePaga/VerificadorFechaDePagaTiempoCompleto');
const VerificadorFechaDePagaTiempoParcial = require('../src/VerificardorFechaDePaga/VerificadorFechaDePagaTiempoParcial');
const VerificadorFechaDePagaComision = require('../src/VerificardorFechaDePaga/VerificadorFechaDePagaComision');

describe("Verificar fecha de paga", function () {
    it(`Si le pasamos 29 de marzo de 2019 (Viernes) al verificador de fecha de paga de 
    empleado de tiempo completo deberia devolver true`, function () {
        console.log("oaisjdoiasjdoiasjdoasi")
            let verificador = new VerificadorFechaDePagaTiempoCompleto(new Date(2019, 2, 29))
            expect(verificador.esDiaDePaga()).eq(true);
        });
    it(`Si le pasamos 8 de enero de 2019 (Jueves) al verificador de fecha de paga de 
        empleado de tiempo completo deberia devolver false`, function () {
            let verificador = new VerificadorFechaDePagaTiempoCompleto(new Date(2019, 0, 8))
            expect(verificador.esDiaDePaga()).eq(false);
        });

    it(`Si le pasamos 30 de marzo de 2019 (Sabado) al verificador de fecha de paga de 
        empleado de tiempo completo deberia devolver false`, function () {
            let verificador = new VerificadorFechaDePagaTiempoCompleto(new Date(2019, 2, 30))
            expect(verificador.esDiaDePaga()).eq(false);
        });

    it(`Si le pasamos 22 de marzo de 2019 (Viernes) al verificador de fecha de paga de 
        empleado de tiempo parcial deberia devolver true`, function () {
            let verificador = new VerificadorFechaDePagaTiempoParcial(new Date(2019, 2, 22))
            expect(verificador.esDiaDePaga()).eq(true);
        });

    it(`Si le pasamos 14 de marzo de 2019 (Jueves) al verificador de fecha de paga de 
        empleado de tiempo parcial deberia devolver true`, function () {
            let verificador = new VerificadorFechaDePagaTiempoParcial(new Date(2019, 2, 14))
            expect(verificador.esDiaDePaga()).eq(false);
        });

    it(`Si le pasamos 14 de marzo de 2019 (Jueves) como fecha de inicio
        22 de marzo de 2019(Viernes) como fecha actual al verificador de fecha de paga de 
        empleado por comision deberia devolver true`, function () {
            let verificador = new VerificadorFechaDePagaComision(new Date(2019, 2, 14), new Date(2019, 2, 22))
            expect(verificador.esDiaDePaga()).eq(true);
        });

    it(`Si le pasamos 7 de marzo de 2019 (Jueves) como fecha de inicio
        22 de marzo de 2019(Viernes) como fecha actual al verificador de fecha de paga de 
        empleado por comision deberia devolver false`, function () {
            let verificador = new VerificadorFechaDePagaComision(new Date(2019, 2, 7), new Date(2019, 2, 22))
            expect(verificador.esDiaDePaga()).eq(false);
        });

    it(`Si le pasamos 7 de marzo de 2019 (Jueves) como fecha de inicio
        29 de marzo de 2019(Viernes) como fecha actual al verificador de fecha de paga de 
        empleado por comision deberia devolver true`, function () {
            let verificador = new VerificadorFechaDePagaComision(new Date(2019, 2, 7), new Date(2019, 2, 29))
            expect(verificador.esDiaDePaga()).eq(true);
        });

    it(`Si le pasamos 1 de enero de 2019 (Martes) como fecha de inicio
        11 de enero de 2019(Viernes) como fecha actual al verificador de fecha de paga de 
        empleado por comision deberia devolver true`, function () {
            let verificador = new VerificadorFechaDePagaComision(new Date(2019, 0, 1), new Date(2019, 0, 11))
            expect(verificador.esDiaDePaga()).eq(true);
        });

    it(`Si le pasamos 28 de diciembre de 2018 (Viernes) como fecha de inicio
        11 de enero de 2019(Viernes) como fecha actual al verificador de fecha de paga de 
        empleado por comision deberia devolver true`, function () {
            let verificador = new VerificadorFechaDePagaComision(new Date(2018, 11, 28), new Date(2019, 0, 11))
            expect(verificador.esDiaDePaga()).eq(true);
        });
})