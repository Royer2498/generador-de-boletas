const express = require('express');
const router = express.Router();
const GeneradorMetodoEnvioRequestModel = require('../DTOs/GeneradorMetodoEnvioRequestModel');
const GeneradorBoletaRequestModel = require('../DTOs/GeneradorBoletaRequestModel');
const GeneradorBoletasRequestModel = require('../DTOs/GeneradorBoletasRequestModel');

const NotificarBoletaDePagoInteractor = require('../../Casos de uso/Boleta de pago/NotificarBoletaDePagoInteractor');
const EnviarBoletaInteractor = require('../../Casos de uso/Boleta de pago/EnviarBoletaInteractor');
const EnviarBoletasInteractor = require('../../Casos de uso/Boleta de pago/EnviarBoletasInteractor');

const PresentadorBoleta = require('../Presentadores/PresentadorBoleta');
const PresentadorBoletas = require('../Presentadores/PresentadorBoletas');
const PresentadorNotificacion = require('../Presentadores/PresentadorNotificacion');

var empleadoRepositorio;
(async function () {
    empleadoRepositorio = await require('./server');
})()


router.post("/generar/:metodoEnvio", async function (consulta, respuesta) {
    let generadorRequestModel = new GeneradorBoletaRequestModel(consulta);
    let requestModel = generadorRequestModel.obtenerRequestModel();
    let enviarBoletaInteractor = new EnviarBoletaInteractor();
    let respuestaInteractor = await enviarBoletaInteractor.generarBoleta(requestModel);
    let presentador = new PresentadorBoleta(respuestaInteractor);
    let respuestaMetodo = presentador.obtenerObjetoRespuesta();
    respuesta.send(respuestaMetodo);
})

router.get("/enviar-boletas", async function (consulta, respuesta) {
    let generadorRequestModel = new GeneradorBoletasRequestModel();
    let requestModel = generadorRequestModel.obtenerRequestModel();
    let enviarBoletasInteractor = new EnviarBoletasInteractor(empleadoRepositorio);
    let respuestaInteractor = await enviarBoletasInteractor.enviar(requestModel);
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