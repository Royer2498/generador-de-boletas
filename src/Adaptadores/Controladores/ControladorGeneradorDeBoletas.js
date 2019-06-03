const express = require('express');
const router = express.Router();
const GeneradorMetodoEnvioRequestModel = require('../DTOs/GeneradorMetodoEnvioRequestModel');
const NotificarBoletaDePagoInteractor = require('../../Casos de uso/Boleta de pago/NotificarBoletaDePagoInteractor');
const GeneradorBoletaRequestModel = require('../DTOs/GeneradorBoletaRequestModel');
const GenerarBoletaInteractor = require('../../Casos de uso/Boleta de pago/GenerarBoletaInteractor');
const PresentadorBoletas = require('../Presentadores/PresentadorBoletas');
const PresentadorNotificacion = require('../Presentadores/PresentadorNotificacion');

router.post("/generar/:metodoEnvio", async function (consulta, respuesta) {
    let generadorRequestModel = new GeneradorBoletaRequestModel(consulta);
    let requestModel = generadorRequestModel.obtenerRequestModel();
    let generarBoletaInteractor = new GenerarBoletaInteractor();
    let respuestaInteractor = await generarBoletaInteractor.generarBoleta(requestModel);
    let presentador = new PresentadorBoletas(respuestaInteractor);
    let respuestaMetodo = presentador.obtenerObjetoRespuesta();
    respuesta.send(respuestaMetodo);
})


router.post("/notificar/:metodoEnvio", async function (consulta, respuesta) {
    let generadorRequestModel = new GeneradorMetodoEnvioRequestModel(consulta);
    let requestModel = generadorRequestModel.obtenerRequestModel();
    let notificarBoletaDePagoInteractor = new NotificarBoletaDePagoInteractor();
    let respuestaInteractor = await notificarBoletaDePagoInteractor.enviar(requestModel)
    let presentador = new PresentadorNotificacion(respuestaInteractor);
    let respuestaNotificacion = presentador.obtenerObjetoRespuesta();
    respuesta.send(respuestaNotificacion);
})



module.exports = router;