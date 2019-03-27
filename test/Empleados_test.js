var expect = require("chai").expect;

import { Salario } from "../Salario.js";
import { EmpleadoPorComision } from "../EmpleadoPorComision";
import { EmpleadoTiempoCompleto } from "../EmpleadoTiempoCompleto";

describe("Empleados", function () {

    it(`el sueldo para un empleado fijo con salario 7000 deberia ser 7000`, function () {
        let salario = new Salario(7000, "Bs")
        let empleado = new EmpleadoTiempoCompleto("Juan Perez", salario, "Gerente");
        expect(empleado.calcularSalario()).equal(7000);
    });

    it(`el sueldo para un empleado por comision con sueldo base 100, 1000bs vendidos
    y 10% de comision deberia ser 200`, function () {
            let salario = new Salario(100, "Bs")
            let empleado = new EmpleadoPorComision("Juan Perez", salario, "Gerente", 10, 1000);
            expect(empleado.calcularSalario()).equal(200);
        });

});
