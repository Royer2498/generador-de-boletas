const express = require('express');
const router = express.Router();
const Mail = require('../Metodos de envio/Mail')
const Facebook = require('../Metodos de envio/Facebook');
const WhatsApp = require('../Metodos de envio/WhatsApp');
const GeneradorBoleta = require('../../Boleta de pago/GeneradorBoleta');
const Empleado = require('../../Empleados/Empleado');
const CalculadoraTiempoCompleto = require('../../Calculadora salario/CalculadoraTiempoCompleto');

function manejarError(respuesta, mensajeDeError, codigo) {
    respuesta.send(codigo).send(mensajeDeError);
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

function crearEmpleado(empleado) {
    let empleadoObj = new Empleado(empleado.nombre, empleado.ci, empleado.cargo);
    let calculadora = new CalculadoraTiempoCompleto();
    empleadoObj.establecerCalculadora(calculadora);
    empleadoObj.establecerSalarioMensual(empleado.calculadoraSalario.salarioMensual);
    return empleadoObj;
}

router.post("/generar/:metodoEnvio", function (consulta, respuesta) {
    let metodoEnvio = consulta.params.metodoEnvio;
    let empleado = consulta.body.empleado;
    let empleadoObj = crearEmpleado(empleado);
    let infoEnvio = consulta.body.informacionEnvio;
    let boletaDePago = GeneradorBoleta.obtener(empleadoObj);
    infoEnvio.boletaDePago = boletaDePago;
    let medioDeEnvio = obtenerMetodoDeEnvio(metodoEnvio);
    medioDeEnvio.enviar(infoEnvio, function(error, informacion) {
        if (error)
            manejarError(respuesta, error, 418);
        else
            respuesta.send("boleta enviada: " + informacion.response);
    })
})

router.get("/notificar/:email", function (consulta, respuesta) {
    let criterioDeBusqueda = { ci: parseInt(consulta.params.ci) };
    conexionABaseDeDatos.buscar(criterioDeBusqueda, coleccionEmpleados, function (error, resultados) {
        if (error)
            manejarError(respuesta, error.stack, 409);
        else if (!hayResultados(resultados))
            manejarError(respuesta, "No se encontro al empleado", 404)
        else
            respuesta.send(resultados);
    })
})

module.exports = router;