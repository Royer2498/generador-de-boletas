const express = require('express');
const router = express.Router();

const ObtenerEmpleadosInteractor = require('../../Casos de uso/Empleados/ObtenerEmpleadosInteractor');
const ObtenerEmpleadoInteractor = require('../../Casos de uso/Empleados/ObtenerEmpleadoInteractor');
const GuardarEmpleadoInteractor = require('../../Casos de uso/Empleados/GuardarEmpleadoInteractor');
const GuardarEmpleadosInteractor = require('../../Casos de uso/Empleados/GuardarEmpleadosInteractor');
const ActualizarEmpleadoInteractor = require('../../Casos de uso/Empleados/ActualizarEmpleadoInteractor');
const EliminarEmpleadoInteractor = require('../../Casos de uso/Empleados/EliminarEmpleadoInteractor');

const UtilitariosEmpleados = require('../../Entidades/Utilitarios/UtilitariosEmpleados');

const PresentadorEmpleados = require('../Presentadores/PresentadorEmpleados');
const PresentadorRespuestaEmpleado = require('../Presentadores/PresentadorRespuestaEmpleado');

const GeneradorCIRequestModel = require('../DTOs/GeneradorCIRequestModel');
const GeneradorEmpleadoRequestModel = require('../DTOs/GeneradorEmpleadoRequestModel');
const GeneradorEmpleadosRequestModel = require('../DTOs/GeneradorEmpleadosRequestModel');
const GeneradorEmpleadoActualizarRequestModel = require('../DTOs/GeneradorEmpleadoActualizarRequestModel');

var empleadoRepositorio;

(async function () {
    empleadoRepositorio = await require('./server');
})()


function manejarError(respuesta, mensajeDeError, codigo) {
    respuesta.status(codigo).send(mensajeDeError);
}

function hayResultados(resultados) {
    return resultados.length > 0
}

router.get("/obtener-todos", async function (consulta, respuesta) {
    let obtenerEmpleadosInteractor = new ObtenerEmpleadosInteractor(empleadoRepositorio);
    let empleados = await obtenerEmpleadosInteractor.obtenerEmpleados();
    let presentador = new PresentadorEmpleados(empleados);
    let empleadosRespuesta = presentador.obtenerObjetoRespuesta();
    respuesta.send(empleadosRespuesta);
})

router.get("/:ci", async function (consulta, respuesta) {
    let generadorRequestModel = new GeneradorCIRequestModel(consulta);
    let requestModel = generadorRequestModel.obtenerRequestModel();
    let obtenerEmpleadoInteractor = new ObtenerEmpleadoInteractor(empleadoRepositorio);
    let empleado = await obtenerEmpleadoInteractor.obtenerEmpleado(requestModel);
    let presentador = new PresentadorEmpleados(empleado);
    let empleadoRespuesta = presentador.obtenerObjetoRespuesta();
    respuesta.send(empleadoRespuesta);
})

router.post("/", async function (consulta, respuesta) {
    let generadorRequestModel = new GeneradorEmpleadoRequestModel(consulta);
    let requestModel = generadorRequestModel.obtenerRequestModel();
    let insertarEmpleadoInteractor = new GuardarEmpleadoInteractor(empleadoRepositorio);
    let respuestaDeInsercion = {};
    try {
        respuestaDeInsercion = await insertarEmpleadoInteractor.guardarEmpleado(requestModel);
    } catch (error) {
        console.log("error al insertar un empleado");
    }
    let presentador = new PresentadorRespuestaEmpleado(respuestaDeInsercion);
    let respuestaMetodo = presentador.obtenerObjetoRespuesta();
    respuesta.send(respuestaMetodo);
})


router.post("/insertar-varios", async function (consulta, respuesta) {
    let generadorRequestModel = new GeneradorEmpleadosRequestModel(consulta);
    let requestModel = generadorRequestModel.obtenerRequestModel();
    let insertarEmpleadosInteractor = new GuardarEmpleadosInteractor(empleadoRepositorio);
    let respuestaDeInsercion = {};
    try {
        respuestaDeInsercion = await insertarEmpleadosInteractor.guardarEmpleados(requestModel);
    } catch (error) {
        console.log("error al insertar varios empleado");
    }
    let presentador = new PresentadorRespuestaEmpleado(respuestaDeInsercion);
    let respuestaMetodo = presentador.obtenerObjetoRespuesta();
    respuesta.send(respuestaMetodo);
})

router.put("/", async function (consulta, respuesta) {
    // let generadorRequestModel = new GeneradorEmpleadoRequestModel(consulta);
    let generadorEmpleadoActualizarRequestModel = new GeneradorEmpleadoActualizarRequestModel(consulta);
    let requestModel = generadorEmpleadoActualizarRequestModel.obtenerRequestModel();
    let actualizarEmpleadoInteractor = new ActualizarEmpleadoInteractor(empleadoRepositorio);
    let respuestaDeInsercion = {};
    try {
        respuestaDeInsercion = await actualizarEmpleadoInteractor.actualizarEmpleado(requestModel);
    } catch (error) {
    }
    let presentador = new PresentadorRespuestaEmpleado(respuestaDeInsercion);
    let respuestaMetodo = presentador.obtenerObjetoRespuesta();
    respuesta.send(respuestaMetodo);
})

router.delete("/:ci", async function (consulta, respuesta) {
    let eliminarEmpleadoInteractor = new EliminarEmpleadoInteractor(empleadoRepositorio);
    let respuestaDeInsercion = {};
    try {
        respuestaDeInsercion = await eliminarEmpleadoInteractor.eliminarEmpleado(consulta);
    } catch (error) {
        console.log("error al eliminar un empleado");
    }
    let presentador = new PresentadorRespuestaEmpleado(respuestaDeInsercion);
    let respuestaMetodo = presentador.obtenerObjetoRespuesta();
    respuesta.send(respuestaMetodo);
})

module.exports = router;