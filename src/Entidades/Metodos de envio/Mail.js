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

    enviar(contenido) {
        var opcionesDeCorreo = {
            from: this.remitente,
            to: contenido.destinatario,
            subject: contenido.asunto,
            text: contenido.contenido
        };
        var transportador = this.transportador;
        return new Promise(function (resolve, reject) {
            transportador.sendMail(opcionesDeCorreo, function (error, informacion) {
                if (error)
                    reject(error);
                else
                    resolve(informacion);
            });
        })

    }
}

module.exports = Mail;
