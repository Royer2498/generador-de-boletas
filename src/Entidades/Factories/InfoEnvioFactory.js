class InfoEnvioFactory {
    constructor() { }

    static obtenerInfoDeEnvio(empleado, origenInfo, boletaDePago) {
        switch (empleado.metodoDeEnvioCadena) {
            case "Email":
                let asunto;
                if (origenInfo=="generar boleta")
                    asunto = "Boleta de pago"
                else
                    asunto = "Su boleta de pago ya esta lista";
                return {
                    destinatario: empleado.email,
                    asunto: asunto,
                    contenido: boletaDePago
                }
            case "Facebook":
                return {};
            case "WhatsApp":
                return {};
            default:
                return null;
        }
    }
}

module.exports = InfoEnvioFactory;