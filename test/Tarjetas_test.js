var expect = require("chai").expect;

import { TarjetaHorasTrabajadas } from "../src/Tarjetas/TarjetaHorasTrabajadas";
import { TarjetaVentas } from "../src/Tarjetas/TarjetaVentas";

describe("Empleados", function () {

    it(`si registramos tres registros de: 
    31/3/2019 hora entrada: 10, hora salida: 13
    31/3/2019 hora entrada: 15, hora salida: 20
    01/4/2019 hora entrada: 10, hora salida: 15
    las horas calculadas deberian ser 13`, function () {
            let tarjeta = new TarjetaHorasTrabajadas();
            tarjeta.registrarSesion("2019-03-31", "10:00:00", "13:00:00");
            tarjeta.registrarSesion("2019-03-31", "15:00:00", "20:00:00");
            tarjeta.registrarSesion("2019-04-01", "10:00:00", "15:00:00");
            expect(tarjeta.calcularHoras()).equal(13);
        });

});
