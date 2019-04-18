var nodemailer = require('nodemailer');

class Mail {
    constructor() {
        this.remitente = 'generador.de.boletas@gmail.com';
        this.transportador = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: this.remitente,
                pass: 'generadordeboletas123'
            }
        });
    }

    enviar(contenido, callback) {
        var opcionesDeCorreo = {
            from: this.remitente,
            to: contenido.destinatario,
            subject: contenido.asunto,
            text: contenido.boletaDePago
        };
        this.transportador.sendMail(opcionesDeCorreo, callback);
    }
}

module.exports = Mail;
