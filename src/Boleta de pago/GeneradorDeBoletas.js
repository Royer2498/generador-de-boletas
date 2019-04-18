const GeneradorBoleta = require("./GeneradorBoleta");

class GeneradorDeBoletas {

    constructor(empleados) {
        this.empleados = empleados;
    }

    generarBoletas() {
        let boletasDePago = [];
        for (let empleado of this.empleados) {
            boletasDePago.push(GeneradorBoleta.obtener(empleado));
        }
        return boletasDePago;
    }

}

module.exports = GeneradorDeBoletas;