var expect = require("chai").expect;

import { Empleado } from "../src/Empleados/Empleado";
import { TarjetasDeHorasTrabajadas } from '../src/Tarjetas/TarjetasDeHorasTrabajadas';
import { TarjetasDeVentas } from "../src/Tarjetas/TarjetasDeVentas";
import { CalculadoraTiempoCompleto } from "../src/Calculadora salario/CalculadoraTiempoCompleto";
import { CalculadoraTiempoParcial } from "../src/Calculadora salario/CalculadoraTiempoParcial";
import { CalculadoraPorComision } from "../src/Calculadora salario/CalculadoraPorComision";
import { VerificadorFechaDePagaTiempoCompleto } from '../src/VerificardorFechaDePaga/VerificadorFechaDePagaTiempoCompleto'

describe("Verificar fecha de paga", function () {
    it(`Si le pasamos 29 de marzo de 2019 (Viernes) al verificador de fecha de paga de 
    empleado de tiempo completo deberia devolver true`, function () {
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
})