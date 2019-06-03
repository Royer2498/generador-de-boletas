class EnviarBoletas {
    constructor() { }

    async enviarBoletas(transportadorBoletas) {
        let respuestas = [];
        for (let dotBoleta of transportadorBoletas) {
            let sender = dotBoleta.metodoDeEnvio;
            let respuesta = await sender.enviar(dotBoleta.infoEnvio)
            respuestas.push(respuesta);
        }
        return respuestas;
    }
}

module.exports = EnviarBoletas;