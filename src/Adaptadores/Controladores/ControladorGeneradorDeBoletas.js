const express = require('express');
const router = express.Router();
const GeneradorBoleta = require('../../Casos de uso/Boleta de pago/GeneradorBoleta');
const UtilitariosEmpleados = require('../../Entidades/Utilitarios/UtilitariosEmpleados');
const MetodoDeEnvioFactory = require('../../Entidades/Factories/MetodoDeEnvioFactory');

function manejarError(respuesta, mensajeDeError, codigo) {
    respuesta.status(codigo).send(mensajeDeError);
}

/* router.post("/generar/:metodoEnvio", async function (consulta, respuesta) {
    let metodoEnvio = consulta.params.metodoEnvio;
    let empleado = consulta.body.empleado;
    empleado = UtilitariosEmpleados.parsearEmpleado(empleado);
    let infoEnvio = consulta.body.informacionEnvio;
    let boletaDePago = GeneradorBoleta.obtener(empleado);
    infoEnvio.contenido = boletaDePago;
    let medioDeEnvio = MetodoDeEnvioFactory.obtenerMetodoDeEnvio(metodoEnvio);
    let resp = await medioDeEnvio.enviar(infoEnvio);
    respuesta.send(resp);
})

router.post("/notificar/:metodoEnvio", function (consulta, respuesta) {
    let metodoEnvio = consulta.params.metodoEnvio;
    let notificacion = consulta.body;
    let medioDeEnvio = MetodoDeEnvioFactory.obtenerMetodoDeEnvio(metodoEnvio);
    let resp = await medioDeEnvio.enviar(notificacion);
    respuesta.send(resp);
}) */

module.exports = router;