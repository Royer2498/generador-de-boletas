const express = require('express');
const router = express.Router();
var coleccionEmpleados
var conexionABaseDeDatos
setTimeout(function () {
    conexionABaseDeDatos = require('../server')
    coleccionEmpleados = conexionABaseDeDatos.baseDeDatos.collection('empleados');
}, 2000);

function manejarError(respuesta, mensajeDeError, codigo) {
    respuesta.send(codigo).send(mensajeDeError);
}

function hayResultados(resultados) {
    return resultados.length > 0
}

router.get("/obtener-todos", function (consulta, respuesta) {
    conexionABaseDeDatos.obtenerTodos(coleccionEmpleados, function (error, resultados) {
        if (error)
            manejarError(respuesta, error.stack, 418);
        else
            respuesta.send(resultados);
    })
})

router.get("/:ci", function (consulta, respuesta) {
    let criterioDeBusqueda = { ci: parseInt(consulta.params.ci) };
    conexionABaseDeDatos.buscar(criterioDeBusqueda, coleccionEmpleados, function (error, resultados) {
        if (error)
            manejarError(respuesta, error.stack, 409);
        else if (!hayResultados())
            manejarError(respuesta, "No se encontro al empleado", 404)
        else
            respuesta.send(resultados);
    })
})

router.post("/", function (consulta, respuesta) {
    let empleado = consulta.body;
    let criterioDeBusqueda = { ci: parseInt(empleado.ci) }
    conexionABaseDeDatos.buscar(criterioDeBusqueda, coleccionEmpleados, function (error, resultados) {
        if (error)
            manejarError(respuesta, error.stack, 409)
        else if (hayResultados())
            manejarError(respuesta, "Ya existe un empleado con ese CI", 409)
        else {
            conexionABaseDeDatos.insertar(empleado, coleccionEmpleados, function (error, resp) {
                if (error)
                    manejarError(respuesta, error.stack, 409)
                respuesta.send("insertado exitosamente");
            })
        }

    })
})

router.put("/", function (consulta, respuesta) {
    let empleado = consulta.body;
    let criterioDeBusqueda = { ci: parseInt(empleado.ci) }
    conexionABaseDeDatos.buscar(criterioDeBusqueda, coleccionEmpleados, function (error, resultados) {
        if (error)
            manejarError(respuesta, error.stack, 409)
        else if (!hayResultados(resultados))
            manejarError(respuesta, "No se encontro al empleado", 404)
        else {
            let empleadoActualizado = { $set: empleado }
            conexionABaseDeDatos.actualizar(criterioDeBusqueda, empleadoActualizado, coleccionEmpleados,
                function (error, resp) {
                    if (error)
                        manejarError(respuesta, error.stack, 409)
                    respuesta.send("actualizado exitosamente");
                })
        }
    })
})

router.delete("/:ci", function (consulta, respuesta) {
    let criterioDeBusqueda = { ci: parseInt(consulta.params.ci) };
    conexionABaseDeDatos.buscar(criterioDeBusqueda, coleccionEmpleados, function (error, resultados) {
        if (error)
            manejarError(respuesta, error.stack, 409)
        else if (!hayResultados())
            manejarError(respuesta, "No se encontro al empleado", 404)
        else {
            conexionABaseDeDatos.eliminar(criterioDeBusqueda, coleccionEmpleados, function (error, resp) {
                if (error)
                    manejarError(respuesta, error.stack, 409)
                respuesta.send("eliminado exitosamente");
            })
        }
    })
})

module.exports = router;