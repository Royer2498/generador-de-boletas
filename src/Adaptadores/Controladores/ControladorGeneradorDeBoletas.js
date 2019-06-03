const express = require('express');
const router = express.Router();
const GeneradorBoleta = require('../../Casos de uso/Boleta de pago/GeneradorBoleta');
const UtilitariosEmpleados = require('../../Entidades/Utilitarios/UtilitariosEmpleados');
const MetodoDeEnvioFactory = require('../../Entidades/Factories/MetodoDeEnvioFactory');
const GeneradorMetodoEnvioRequestModel = require('../DTOs/GeneradorMetodoEnvioRequestModel');
const NotificarBoletaDePagoInteractor = require('../../Casos de uso/Boleta de pago/NotificarBoletaDePagoInteractor');
const GeneradorBoletaRequestModel = require('../DTOs/GeneradorBoletaRequestModel');
const GenerarBoletaInteractor = require('../../Casos de uso/Boleta de pago/GenerarBoletaInteractor');
const PresentadorBoletas = require('../Presentadores/PresentadorBoletas');

function manejarError(respuesta, mensajeDeError, codigo) {
    respuesta.status(codigo).send(mensajeDeError);
}

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
    let notificarBoletaDePagoInteractor = new NotificarBoletaDePagoInteractor(requestModel);
    let respuestaDeNotificacion = await notificarBoletaDePagoInteractor.enviar()
    console.log(respuestaDeNotificacion);
    // let resp = await medioDeEnvio.enviar(notificacion);
    respuesta.send(respuestaDeNotificacion);
})

module.exports = router;