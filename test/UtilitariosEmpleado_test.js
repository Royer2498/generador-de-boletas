var expect = require("chai").expect;

const Empleado = require("../src/Empleados/Empleado");
const UtilitariosEmpleados = require("../src/UtilitariosEmpleados");
const TarjetasDeHorasTrabajadas = require('../src/Tarjetas/TarjetasDeHorasTrabajadas');
const TarjetasDeVentas = require("../src/Tarjetas/TarjetasDeVentas");
const CalculadoraTiempoCompleto = require("../src/Calculadora salario/CalculadoraTiempoCompleto");
const CalculadoraTiempoParcial = require("../src/Calculadora salario/CalculadoraTiempoParcial");
const CalculadoraPorComision = require("../src/Calculadora salario/CalculadoraPorComision");

describe("Empleados", function () {

    it(`despues de parsear un empleado de tiempo completo JSON con la clase UtilitariosEmpleados, se deberia
    poder calcular su salario`, function () {
            let empleado = new Empleado("Juan Perez", 123, 'Gerente');
            let calculadora = new CalculadoraTiempoCompleto();
            empleado.establecerCalculadora(calculadora);
            empleado.establecerSalarioMensual(7000);
            let empleadoString = JSON.stringify(empleado);
            let empleadoObtenido = JSON.parse(empleadoString);
            let empleadoParseado = UtilitariosEmpleados.parsearEmpleado(empleadoObtenido);
            expect(empleadoParseado.calcularSalarioTotal()).eq(7000);
        });

    it(`despues de parsear un empleado de tiempo parcial JSON con la clase UtilitariosEmpleados, se deberia
    poder calcular su salario`, function () {
            let calculadora = new CalculadoraTiempoParcial();
            let empleado = new Empleado("Juan Perez", 123, 'Gerente');
            empleado.establecerCalculadora(calculadora);
            let tarjeta = new TarjetasDeHorasTrabajadas();
            tarjeta.registrarSesion("2019-03-31", "10:00:00", "13:00:00");
            tarjeta.registrarSesion("2019-03-31", "15:00:00", "20:00:00");
            tarjeta.registrarSesion("2019-04-01", "10:00:00", "15:00:00");
            empleado.establecerSalarioPorHora(100);
            empleado.establecerTarjetaDeHorasTrabajadas(tarjeta);
            let empleadoString = JSON.stringify(empleado);
            let empleadoObtenido = JSON.parse(empleadoString);
            let empleadoParseado = UtilitariosEmpleados.parsearEmpleado(empleadoObtenido);
            expect(empleadoParseado.calcularSalarioTotal()).eq(1300);
        });

    it(`despues de parsear un empleado por comision JSON con la clase UtilitariosEmpleados, se deberia
    poder calcular su salario`, function () {
            let empleado = new Empleado("Juan Perez", 123, 'Gerente');
            let calculadora = new CalculadoraPorComision();
            empleado.establecerCalculadora(calculadora);
            empleado.establecerPorcentajeDeComision(10);
            empleado.establecerSueldoBase(100);
            let tarjeta = new TarjetasDeVentas();
            tarjeta.registrarVenta("2019-03-31", "shampoo", 1000);
            tarjeta.registrarVenta("2019-04-01", "arroz", 1000);
            tarjeta.registrarVenta("2019-04-01", "papa", 20000);
            empleado.establecerTarjetaVentas(tarjeta);
            let empleadoString = JSON.stringify(empleado);
            let empleadoObtenido = JSON.parse(empleadoString);
            let empleadoParseado = UtilitariosEmpleados.parsearEmpleado(empleadoObtenido);
            expect(empleadoParseado.calcularSalarioTotal()).eq(2300);
        });

});
