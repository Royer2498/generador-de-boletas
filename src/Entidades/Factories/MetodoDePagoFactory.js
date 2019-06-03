
const Cheque = require('../Metodos de pago/Cheque')
const Deposito = require('../Metodos de pago/Deposito')
const Efectivo = require('../Metodos de pago/Efectivo')

class MetodoDePagoFactory {

    constructor() { }

    static obtenerMetodoDePago(metodoPago) {
        switch (metodoPago) {
            case "cheque":
                return new Cheque();
            case "deposito":
                return new Deposito();
            case "efectivo":
                return new Efectivo();
            default:
                return null;
        }
    }
}

module.exports = MetodoDePagoFactory;