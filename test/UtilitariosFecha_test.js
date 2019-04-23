var expect = require("chai").expect;

const UtilitariosFecha = require("../src/UtilitariosFecha");

describe("Utilitarios fecha", function () {

    it(`si incrementamos un dia a 2019-03-30 deberia devolvernos 2019-03-31`, function () {
        let fecha = new Date(2019, 2, 30);
        fecha = UtilitariosFecha.incrementarUnDia(fecha);
        expect(fecha.getDate()).eq(31);
    });

    it(`si retrocedemos un dia a 2019-03-30 deberia devolvernos 2019-03-29`, function () {
        let fecha = new Date(2019, 2, 30);
        fecha = UtilitariosFecha.retrocederUnDia(fecha);
        expect(fecha.getDate()).eq(29);
    });

    it(`si retrocedemos 3 dia a 2019-04-02 deberia devolvernos 2019-03-30`, function () {
        let fecha = new Date(2019, 3, 2);
        fecha = UtilitariosFecha.retrocederNDias(fecha, 3);
        expect(fecha.getDate()).eq(30);
    });

    it(`si creamos dos objetos con la fecha 2019-03-30 deberia devolver que son iguales`, function () {
        let fecha1 = new Date(2019, 2, 30);
        let fecha2 = new Date(2019, 2, 30);
        expect(UtilitariosFecha.sonFechasIguales(fecha1, fecha2)).eq(true);
    });

    it(`si creamos dos objetos con fechas distintas deberia devolver que no son iguales`, function () {
        let fecha1 = new Date(2019, 2, 30);
        let fecha2 = new Date(2019, 3, 30);
        expect(UtilitariosFecha.sonFechasIguales(fecha1, fecha2)).eq(false);
    });

    it(`deberia devolvernos que el 29 de marzo de 2019 es dia habil`, function () {
        let fecha = new Date(2019, 2, 29);
        expect(UtilitariosFecha.esDiaHabil(fecha)).eq(true);
    });

    it(`deberia devolvernos que el 30 de marzo de 2019 no es dia habil`, function () {
        let fecha = new Date(2019, 2, 30);
        expect(UtilitariosFecha.esDiaHabil(fecha)).eq(false);
    });

    it(`deberia devolvernos que el 29 de marzo de 2019 es viernes`, function () {
        let fecha = new Date(2019, 2, 29);
        expect(UtilitariosFecha.esViernes(fecha)).eq(true);
    });

    it(`deberia devolvernos que el 28 de marzo de 2019 no es viernes`, function () {
        let fecha = new Date(2019, 2, 28);
        expect(UtilitariosFecha.esViernes(fecha)).eq(false);
    });

    it(`deberia devolvernos que hay 22 dias habiles en abril`, function () {
        let fechaInicio = new Date(2019, 3, 1);
        let fechaFin = new Date(2019, 4, 1);
        expect(UtilitariosFecha.calcularDiasHabiles(fechaInicio, fechaFin)).eq(22);
    });

    it(`deberia devolvernos que la fecha 22 de abril si esta en el intervalo entre 20 de abril y
    30 de abril`, function () {
            let fecha = new Date(2019, 3, 22);
            let fechaInicio = new Date(2019, 3, 20);
            let fechaFin = new Date(2019, 4, 30);
            expect(UtilitariosFecha.laFechaEstaEnIntervalo(fecha, fechaInicio, fechaFin)).eq(true);
        });

    it(`deberia devolvernos que la fecha 10 de abril no esta en el intervalo entre 20 de abril y
    30 de abril`, function () {
            let fecha = new Date(2019, 3, 10);
            let fechaInicio = new Date(2019, 3, 20);
            let fechaFin = new Date(2019, 4, 30);
            expect(UtilitariosFecha.laFechaEstaEnIntervalo(fecha, fechaInicio, fechaFin)).eq(false);
        });

    it(`deberia retroceder hasta el dia habil viernes 19 de abril`, function () {
        let fecha = new Date(2019, 3, 20);
        fecha = UtilitariosFecha.retrocederHastaUnDiaHabil(fecha);
        expect(fecha.getDate()).eq(19);
    });

    it(`deberia retroceder hasta el viernes 19 de abril`, function () {
        let fecha = new Date(2019, 3, 20);
        fecha = UtilitariosFecha.retrocederHastaUnViernes(fecha);
        expect(fecha.getDate()).eq(19);
    });

    it(`el ultimo dia habil de marzo 2019 deberia ser el viernes 29`, function () {
        let fecha = new Date(2019, 2, 20);
        let ultimoDiaHabil = UtilitariosFecha.obtenerUltimoDiaHabilDelMes(fecha);
        expect(ultimoDiaHabil).eq(29);
    });

});
