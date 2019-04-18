var expect = require("chai").expect;
const Empleado = require("../src/Empleados/Empleado");
const request = require('request');
const CalculadoraTiempoCompleto = require('../src/Calculadora salario/CalculadoraTiempoCompleto')

describe("API generador boleta", function () {
    it("se deberia enviar un email con la boleta de pago", function () {
        let calculadora = new CalculadoraTiempoCompleto();
        let empleado = new Empleado("Juan Perez", 123, "Gerente");
        empleado.establecerCalculadora(calculadora);
        empleado.establecerSalarioMensual(10000);
        let infoEnvio = {
            empleado: empleado,
            informacionEnvio: {
                asunto: "Boleta de pago",
                destinatario: "ronaldescobarj@gmail.com",
                
            }
        }
        request.post(
            'http://localhost:3000/api/generador-boletas/generar/email',
            { json: infoEnvio },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                }
            }
        );
    });

});
