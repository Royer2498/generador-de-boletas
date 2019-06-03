const GeneradorBoleta = require('../Boleta de pago/GeneradorBoleta');
const ValidadorRespuestasGeneracionBoletaFactory = require('../../Entidades/Factories/ValidadorRespuestasGeneracionBoletaFactory');
const MetodoDeEnvioFactory = require('../../Entidades/Factories/MetodoDeEnvioFactory')


class GenerarBoletaInteractor {
    constructor() {
    }

    async generarBoleta(datos) {
        console.log(datos.metodoEnvio);
        let metodoEnvio = MetodoDeEnvioFactory.obtenerMetodoDeEnvio(datos.metodoEnvio);
        console.log(metodoEnvio);
        let boleta = GeneradorBoleta.obtener(datos.empleado, new Date());
        datos.infoEnvio.contenido = boleta;
        let respuestaDeEnvio = await metodoEnvio.enviar(datos.infoEnvio);
        return {respuestaEnvio: respuestaDeEnvio, validador: ValidadorRespuestasGeneracionBoletaFactory.obtenerValidador(datos.metodoEnvio)};
    }
}

module.exports = GenerarBoletaInteractor;