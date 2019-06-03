const express = require('express');
const router = express.Router();
const GeneradorBoleta = require('../../Casos de uso/Boleta de pago/GeneradorBoleta');
const UtilitariosEmpleados = require('../../Entidades/Utilitarios/UtilitariosEmpleados');
const MetodoDeEnvioFactory = require('../../Entidades/Factories/MetodoDeEnvioFactory');
const GeneradorBoletaRequestModel = require('../DTOs/GeneradorBoletaRequestModel');
const GeneradorBoletasRequestModel = require('../DTOs/GeneradorBoletasRequestModel');
const GenerarBoletaInteractor = require('../../Casos de uso/Boleta de pago/GenerarBoletaInteractor');
const PresentadorBoleta = require('../Presentadores/PresentadorBoleta');
const PresentadorBoletas = require('../Presentadores/PresentadorBoletas');

var empleadoRepositorio;
(async function () {
    empleadoRepositorio = await require('./server');
})()


router.post("/generar/:metodoEnvio", async function (consulta, respuesta) {
    let generadorRequestModel = new GeneradorBoletaRequestModel(consulta);
    let requestModel = generadorRequestModel.obtenerRequestModel();
    let generarBoletaInteractor = new GenerarBoletaInteractor();
    let respuestaInteractor = await generarBoletaInteractor.generarBoleta(requestModel);
    let presentador = new PresentadorBoleta(respuestaInteractor);
    let respuestaMetodo = presentador.obtenerObjetoRespuesta();
    respuesta.send(respuestaMetodo);
})

router.get("/", async function(consulta, respuesta) {
    let generadorRequestModel = new GeneradorBoletasRequestModel();
    let requestModel = generadorRequestModel.obtenerRequestModel();
    let generadorBoletasInteractor = new GeneradorDeBoletas(empleadoRepositorio);
    let respuestaInteractor = await generadorBoletasInteractor.generarBoletas(requestModel);
    let presentador = new PresentadorBoletas(respuestaInteractor);
    let respuestaMetodo = presentador.obtenerObjetoRespuesta();
    respuesta.send(respuestaMetodo);
})

/*
router.post("/notificar/:metodoEnvio", function (consulta, respuesta) {
    let metodoEnvio = consulta.params.metodoEnvio;
    let notificacion = consulta.body;
    let medioDeEnvio = MetodoDeEnvioFactory.obtenerMetodoDeEnvio(metodoEnvio);
    let resp = await medioDeEnvio.enviar(notificacion);
    respuesta.send(resp);
}) */

module.exports = router;