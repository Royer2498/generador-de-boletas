var expect = require("chai").expect;
const Mail = require('../src/server/Metodos de envio/Mail');
const Facebook = require('../src/server/Metodos de envio/Facebook');
const WhatsApp = require('../src/server/Metodos de envio/WhatsApp');

describe("Metodos de envio", function () {
    it("se deberia poder enviar un email cualquiera", function (done) {
        let medioEnvio = new Mail();
        let contenido = {
            destinatario: "ronaldescobarj@gmail.com",
            asunto: "Prueba",
            contenido: "prueba prueba prueba prueba prueba prueba",
        }
        medioEnvio.enviar(contenido, function (error, informacion) {
            expect(informacion.response).to.have.string("250 2.0.0 OK");
            done();
        });
    });

    it("se deberia poder enviar algo por facebook", function () {
        let medioEnvio = new Facebook();
        let contenido = {
            datosFacebook: "datos facebook"
        }
        expect(medioEnvio.enviar(contenido)).eq("Facebook");

    });

    it("se deberia poder enviar algo por whatsappp", function () {
        let medioEnvio = new WhatsApp();
        let contenido = {
            datosWhatsApp: "datos whatsapp"
        }
        expect(medioEnvio.enviar(contenido)).eq("WhatsApp");
    });

});
