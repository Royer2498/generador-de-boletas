
const Mail = require('../Metodos de envio/Mail')
const Facebook = require('../Metodos de envio/Facebook');
const WhatsApp = require('../Metodos de envio/WhatsApp');

class MetodoDeEnvioFactory {
    constructor() { }

    static obtenerMetodoDeEnvio(metodoEnvio) {
        switch (metodoEnvio) {
            case "Email":
                return new Mail();
            case "Facebook":
                return new Facebook();
            case "WhatsApp":
                return new WhatsApp();
            default:
                return null;
        }
    }
}

module.exports = MetodoDeEnvioFactory;