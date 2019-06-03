const UtilitariosFecha = require('../../Entidades/Utilitarios/UtilitariosFecha');
const GeneradorBoleta = require('../Boleta de pago/GeneradorBoleta');

class GenerarBoletaInteractor {
    constructor() {
    }

    async generarBoleta(datos) {
        let boleta = GeneradorBoleta.obtener(datos.empleado, new Date());
        datos.infoEnvio.contenido = boleta;
        return await datos.metodoEnvio.enviar(datos.infoEnvio);
    }
}

module.exports = GenerarBoletaInteractor;