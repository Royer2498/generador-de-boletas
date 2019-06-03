
const Mail = require('../Metodos de envio/Mail')
const Facebook = require('../Metodos de envio/Facebook');
const WhatsApp = require('../Metodos de envio/WhatsApp');

class MetodoDeEnvioFactory {
    constructor() { }

    static obtenerMetodoDeEnvio(metodoEnvio) {
        switch (metodoEnvio) {
            case "email":
                return new Mail();
            case "facebook":
                return new Facebook();
            case "whatsapp":
                return new WhatsApp();
            default:
                return null;
        }
    }
}

module.exports = MetodoDeEnvioFactory;