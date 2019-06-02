const express = require('express');
const router = express.Router();
const Mail = require('../../Entidades/Metodos de envio/Mail')
const Facebook = require('../../Entidades/Metodos de envio/Facebook');
const WhatsApp = require('../../Entidades/Metodos de envio/WhatsApp');
const GeneradorBoleta = require('../../Casos de uso/Boleta de pago/GeneradorBoleta');
const UtilitariosEmpleados = require('../../Entidades/Utilitarios/UtilitariosEmpleados');

function manejarError(respuesta, mensajeDeError, codigo) {
    respuesta.status(codigo).send(mensajeDeError);
}

function obtenerMetodoDeEnvio(metodoEnvio) {
    switch (metodoEnvio) {
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
    empleado = UtilitariosEmpleados.parsearEmpleado(empleado);
    let infoEnvio = consulta.body.informacionEnvio;
    let boletaDePago = GeneradorBoleta.obtener(empleado);
    infoEnvio.contenido = boletaDePago;
    let medioDeEnvio = obtenerMetodoDeEnvio(metodoEnvio);
    medioDeEnvio.enviar(infoEnvio, function (error, informacion) {
        if (error)
            manejarError(respuesta, error, 418);
        else
            respuesta.send("boleta enviada mediante " + metodoEnvio);
    })
})

router.post("/notificar/:metodoEnvio", function (consulta, respuesta) {
    let metodoEnvio = consulta.params.metodoEnvio;
    let notificacion = consulta.body;
    let medioDeEnvio = obtenerMetodoDeEnvio(metodoEnvio);
    medioDeEnvio.enviar(notificacion, function (error, informacion) {
        if (error)
            manejarError(respuesta, error, 418);
        else
            respuesta.send("boleta enviada mediante " + metodoEnvio);
    })
})

module.exports = router;