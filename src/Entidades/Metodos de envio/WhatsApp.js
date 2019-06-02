class WhatsApp {
    constructor() { }

    enviar(contenido, callback) {
        if (callback !== undefined)
            callback();
        else
            return "WhatsApp";
    }
}

module.exports = WhatsApp;
