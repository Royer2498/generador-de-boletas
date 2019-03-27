var expect = require("chai").expect;

import { Salario } from "../Salario.js";
import { EmpleadoPorComision } from "../EmpleadoPorComision";

describe("Empleados", function () {

    it(`el sueldo para un empleado por comision con sueldo base 100, 1000bs vendidos
    y 10% de comision deberia ser 200`, function () {
            let salario = new Salario(100, "Bs")
            let empleado = new EmpleadoPorComision("Juan Perez", salario, "Gerente", 10, 1000);
            expect(empleado.calcularSalario()).equal(200);
        });

});
