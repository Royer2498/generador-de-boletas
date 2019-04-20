const express = require('express');
const router = express.Router();
const Mail = require('../Metodos de envio/Mail')
const Facebook = require('../Metodos de envio/Facebook');
const WhatsApp = require('../Metodos de envio/WhatsApp');
const GeneradorBoleta = require('../../Boleta de pago/GeneradorBoleta');
const Utilitarios = require('../../Utilitarios');

function manejarError(respuesta, mensajeDeError, codigo) {
    respuesta.status(codigo).send(mensajeDeError);
}

function obtenerMetodoDeEnvio(metodoEnvio) {
    switch(metodoEnvio) {
        case "email":
            return new Mail();
        case "facebook":
            return new Facebook();
        case "whatsapp":
            return new WhatsApp();
        default:
            return null;
    }
}

router.post("/generar/:metodoEnvio", function (consulta, respuesta) {
    let metodoEnvio = consulta.params.metodoEnvio;
    let empleado = consulta.body.empleado;
    empleado = Utilitarios.parsearEmpleado(empleado);
    let infoEnvio = consulta.body.informacionEnvio;
    let boletaDePago = GeneradorBoleta.obtener(empleado);
    infoEnvio.contenido = boletaDePago;
    let medioDeEnvio = obtenerMetodoDeEnvio(metodoEnvio);
    medioDeEnvio.enviar(infoEnvio, function(error, informacion) {
        if (error)
            manejarError(respuesta, error, 418);
        else
            respuesta.send("boleta enviada: " + informacion.response);
    })
})

router.get("/notificar/:metodoEnvio", function (consulta, respuesta) {
    let metodoEnvio = consulta.params.metodoEnvio;
    let notificacion = consulta.body.notificacion;
    let medioDeEnvio = obtenerMetodoDeEnvio(metodoEnvio);
    medioDeEnvio.enviar(notificacion, function (error, informacion) {
        if (error)
            manejarError(respuesta, error, 418);
        else
            respuesta.send("boleta enviada: " + informacion.response);
    })
})

module.exports = router;