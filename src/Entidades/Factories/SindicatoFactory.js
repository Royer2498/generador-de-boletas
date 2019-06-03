
const SindicatoRRHH = require('../Sindicatos/SindicatoRRHH')

class SindicatoFactory {

    constructor() { }

    static crearSindicato(nombre) {
        switch (nombre) {
            case "RRHH":
                return new SindicatoRRHH();
            default:
                return null;
        }
    }
}

module.exports = SindicatoFactory;