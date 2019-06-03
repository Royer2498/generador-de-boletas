const express = require('express');
const router = express.Router();

const ObtenerEmpleadosInteractor = require('../../Casos de uso/Empleados/ObtenerEmpleadosInteractor');
const ObtenerEmpleadoInteractor = require('../../Casos de uso/Empleados/ObtenerEmpleadoInteractor');
const GuardarEmpleadoInteractor = require('../../Casos de uso/Empleados/GuardarEmpleadoInteractor');
const PresentadorEmpleados = require('../Presentadores/PresentadorEmpleados');
const PresentadorRespuestaEmpleado = require('../Presentadores/PresentadorRespuestaEmpleado');
const GeneradorCIRequestModel = require('../DTOs/GeneradorCIRequestModel');
const GeneradorEmpleadoRequestModel = require('../DTOs/GeneradorEmpleadoRequestModel');

var empleadoRepositorio;
(async function() {
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
    } catch(error) {
        console.log(error);
    }
    let presentador = new PresentadorRespuestaEmpleado(respuestaDeInsercion);
    let respuestaMetodo = presentador.obtenerObjetoRespuesta();
    respuesta.send(respuestaMetodo);
})

/*
router.post("/insertar-varios", async function (consulta, respuesta) {
    let empleados = consulta.body;
    let resp = conexionABaseDeDatos.insertarVarios(empleados, entidadEmpleados);
    respuesta.send(resp);
})

router.put("/", async function (consulta, respuesta) {
    let empleado = consulta.body;
    let criterioDeBusqueda = { ci: parseInt(empleado.ci) }
    let empleado = await conexionABaseDeDatos.buscar(criterioDeBusqueda, entidadEmpleados);
    let resp = {};
    if (empleado != null) {
        let empleadoActualizado = { $set: empleado }
        resp = conexionABaseDeDatos.actualizar(criterioDeBusqueda, empleadoActualizado, entidadEmpleados)
    }
    respuesta.send(resp);
})

router.delete("/:ci", async function (consulta, respuesta) {
    let criterioDeBusqueda = { ci: parseInt(consulta.params.ci) };
    let empleado = await conexionABaseDeDatos.buscar(criterioDeBusqueda, entidadEmpleados);
    let resp = {};
    if (empleado != null) {
        resp = conexionABaseDeDatos.eliminar(criterioDeBusqueda, entidadEmpleados);
    }
    respuesta.send(resp);

}) */

module.exports = router;