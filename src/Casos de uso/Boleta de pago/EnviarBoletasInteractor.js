const GenerarBoletas = require('./GenerarBoletas');
const EnviarBoletas = require('./EnviarBoletas');

class EnviarBoletasInteractor {
    constructor(repositorio) {
        this.repositorio = repositorio;
    }

    async enviar(fecha) {
        let generadorDeBoletas = new GenerarBoletas(this.repositorio);
        let enviadorDeBoletas = new EnviarBoletas();
        let boletas = await generadorDeBoletas.generarBoletas(fecha);
        let respuestas = await enviadorDeBoletas.enviarBoletas(boletas);
        return respuestas;
    }
}

module.exports = EnviarBoletasInteractor;