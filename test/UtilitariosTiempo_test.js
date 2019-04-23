var expect = require("chai").expect;

const UtilitariosTiempo = require("../src/UtilitariosTiempo");

describe("Utilitarios tiempo", function () {

    it(`7200000 milisegundos deberian ser dos horas`, function () {
        let milisegundos = 7200000;
        expect(UtilitariosTiempo.convertirMilisegundosAHoras(milisegundos)).eq(2);
    });

    it(`172800000 milisegundos deberian ser dos dias`, function () {
        let milisegundos = 172800000;
        expect(UtilitariosTiempo.convertirMilisegundosADias(milisegundos)).eq(2);
    });

    it(`los milisegundos para 23 de mayo 2019 deberian ser 1558584000000`, function () {
        let fecha = new Date(2019, 4, 23);
        expect(UtilitariosTiempo.obtenerMilisegundos(fecha)).eq(1558584000000);
    });

});
