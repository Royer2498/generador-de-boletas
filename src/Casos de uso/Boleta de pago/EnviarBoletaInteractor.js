const GeneradorBoleta = require('./GeneradorBoleta');
const ValidadorRespuestasGeneracionBoletaFactory = require('../../Entidades/Factories/ValidadorRespuestasGeneracionBoletaFactory');
const MetodoDeEnvioFactory = require('../../Entidades/Factories/MetodoDeEnvioFactory')


class EnviarBoletaInteractor {
    constructor() {
    }

    async generarBoleta(datos) {
        let metodoEnvio = MetodoDeEnvioFactory.obtenerMetodoDeEnvio(datos.metodoEnvio);
        let boleta = GeneradorBoleta.obtener(datos.empleado, new Date());
        datos.infoEnvio.contenido = boleta;
        let respuestaDeEnvio = await metodoEnvio.enviar(datos.infoEnvio);
        return { respuestaEnvio: respuestaDeEnvio, validador: ValidadorRespuestasGeneracionBoletaFactory.obtenerValidador(datos.metodoEnvio) };
    }
}

module.exports = EnviarBoletaInteractor;