class PresentadorBoletas {
    constructor(respuestas) {
        this.respuestasInteractor = respuestas;
    }

    obtenerObjetoRespuesta() {
        let respuestas = [];
        for (let respuesta of this.respuestasInteractor) {
            let resp = { content: respuesta };
            respuestas.push(resp);
        }
        return respuestas;
    }
}

module.exports = PresentadorBoletas;
