var expect = require("chai").expect;
const Empleado = require("../src/Entidades/Empleados/Empleado");
const request = require('request');
const CalculadoraTiempoCompleto = require('../src/Entidades/Calculadora salario/CalculadoraTiempoCompleto')
const VerificadorFechaDePagaTiempoCompleto = require('../src/Entidades/VerificardorFechaDePaga/VerificadorFechaDePagaTiempoCompleto');

xdescribe("API generador boleta", function () {
    it("se deberia enviar un email con la boleta de pago", function (done) {
        let calculadora = new CalculadoraTiempoCompleto();
        let verificador = new VerificadorFechaDePagaTiempoCompleto();
        let empleado = new Empleado("Juan Perez", 123, "Gerente");
        empleado.establecerVerificadorDiaDePaga(verificador);
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
                expect(response.statusCode).eq(200);
                done();
                
            }
        );
    });

    it("se deberia enviar un email con la notificacion de que la boleta de pago ya esta lista",
    function (done) {
        let infoEnvio = {
            destinatario: "ronaldescobarj@gmail.com",
            asunto: "Boleta de pago",
            contenido: "Su boleta de pago ya esta lista"
        };
        request.post(
            'http://localhost:3000/api/generador-boletas/notificar/email',
            { json: infoEnvio },
            function (error, response, body) {
                expect(response.statusCode).eq(200);
                done();
            }
        );
    });

    it("se deberia enviar la boleta de pago por facebook", function (done) {
        let calculadora = new CalculadoraTiempoCompleto();
        let verificador = new VerificadorFechaDePagaTiempoCompleto();
        let empleado = new Empleado("Juan Perez", 123, "Gerente");
        empleado.establecerVerificadorDiaDePaga(verificador);
        empleado.establecerCalculadora(calculadora);
        empleado.establecerSalarioMensual(10000);
        let infoEnvio = {
            empleado: empleado,
            informacionEnvio: {
                datosFacebook: "datos facebook"
            }
        }
        request.post(
            'http://localhost:3000/api/generador-boletas/generar/facebook',
            { json: infoEnvio },
            function (error, response, body) {
                expect(response.statusCode).eq(200);
                done();

            }
        );
    });

    it("se deberia enviar una notificacion por facebook de que la boleta de pago ya esta lista",
        function (done) {
            let notificacion = {
                datosFacebook: "datos facebook"
            };
            request.post(
                'http://localhost:3000/api/generador-boletas/notificar/facebook',
                { json: notificacion },
                function (error, response, body) {
                    expect(response.statusCode).eq(200);
                    done();
                }
            );
        });

    it("se deberia enviar la boleta de pago por whatsapp", function (done) {
        let calculadora = new CalculadoraTiempoCompleto();
        let verificador = new VerificadorFechaDePagaTiempoCompleto();
        let empleado = new Empleado("Juan Perez", 123, "Gerente");
        empleado.establecerVerificadorDiaDePaga(verificador);
        empleado.establecerCalculadora(calculadora);
        empleado.establecerSalarioMensual(10000);
        let infoEnvio = {
            empleado: empleado,
            informacionEnvio: {
                datosWhatsApp: "datos whatsapp"
            }
        }
        request.post(
            'http://localhost:3000/api/generador-boletas/generar/whatsapp',
            { json: infoEnvio },
            function (error, response, body) {
                expect(response.statusCode).eq(200);
                done();

            }
        );
    });

    it("se deberia enviar una notificacion por whatsapp de que la boleta de pago ya esta lista",
        function (done) {
            let notificacion = {
                datosWhatsApp: "datos whatsapp"
            };
            request.post(
                'http://localhost:3000/api/generador-boletas/notificar/whatsapp',
                { json: notificacion },
                function (error, response, body) {
                    expect(response.statusCode).eq(200);
                    done();
                }
            );
        });
});
