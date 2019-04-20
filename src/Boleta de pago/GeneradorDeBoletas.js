const GeneradorBoleta = require("./GeneradorBoleta");

class GeneradorDeBoletas {

    constructor() {
    }

    static generarBoletas(empleados) {
        let boletasDePago = [];
        for (let empleado of empleados) {
            boletasDePago.push(GeneradorBoleta.obtener(empleado.datos, empleado.metodoDePago));
        }
        return boletasDePago;
    }
}

module.exports = GeneradorDeBoletas;