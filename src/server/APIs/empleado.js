const express = require('express');
const router = express.Router();
const ConexionADBFactory = require('../../Factories/ConexionADBFactory');

var conexionABaseDeDatos;
var entidadEmpleados;

(async function() {
    conexion = await ConexionADBFactory.crearConexionADB("mongo", "mongodb://localhost:27017/", 'generador-de-boletas')
    entidadEmpleados = conexion.baseDeDatos.collection("empleados");
})();


function manejarError(respuesta, mensajeDeError, codigo) {
    respuesta.status(codigo).send(mensajeDeError);
}

function hayResultados(resultados) {
    return resultados.length > 0
}

router.get("/obtener-todos", function (consulta, respuesta) {
    conexionABaseDeDatos.obtenerTodos(entidadEmpleados, function (error, resultados) {
        if (error)
            manejarError(respuesta, error.stack, 418);
        else
            respuesta.send(resultados);
    })
})

router.get("/:ci", function (consulta, respuesta) {
    let criterioDeBusqueda = { ci: parseInt(consulta.params.ci) };
    conexionABaseDeDatos.buscar(criterioDeBusqueda, entidadEmpleados, function (error, resultados) {
        if (error)
            manejarError(respuesta, error.stack, 409);
        else if (!hayResultados(resultados))
            manejarError(respuesta, "No se encontro al empleado", 404)
        else
            respuesta.send(resultados);
    })
})

router.post("/", function (consulta, respuesta) {
    let empleado = consulta.body;
    let criterioDeBusqueda = { ci: parseInt(empleado.ci) }
    conexionABaseDeDatos.buscar(criterioDeBusqueda, entidadEmpleados, function (error, resultados) {
        if (error)
            manejarError(respuesta, error.stack, 409)
        else if (hayResultados(resultados))
            manejarError(respuesta, "Ya existe un empleado con ese CI", 409)
        else {
            conexionABaseDeDatos.insertar(empleado, entidadEmpleados, function (error, resp) {
                if (error)
                    manejarError(respuesta, error.stack, 409);
                else
                    respuesta.send("insertado exitosamente");
            })
        }

    })
})

router.post("/insertar-varios", function (consulta, respuesta) {
    let empleados = consulta.body;
    conexionABaseDeDatos.insertarVarios(empleados, entidadEmpleados, function (error, resp) {
        if (error)
            manejarError(respuesta, error.stack, 409);
        else
            respuesta.send("insertados exitosamente");
    })
})

router.put("/", function (consulta, respuesta) {
    let empleado = consulta.body;
    let criterioDeBusqueda = { ci: parseInt(empleado.ci) }
    conexionABaseDeDatos.buscar(criterioDeBusqueda, entidadEmpleados, function (error, resultados) {
        if (error)
            manejarError(respuesta, error.stack, 409)
        else if (!hayResultados(resultados))
            manejarError(respuesta, "No se encontro al empleado", 404)
        else {
            let empleadoActualizado = { $set: empleado }
            conexionABaseDeDatos.actualizar(criterioDeBusqueda, empleadoActualizado, entidadEmpleados,
                function (error, resp) {
                    if (error)
                        manejarError(respuesta, error.stack, 409);
                    else
                        respuesta.send("actualizado exitosamente");
                })
        }
    })
})

router.delete("/:ci", function (consulta, respuesta) {
    let criterioDeBusqueda = { ci: parseInt(consulta.params.ci) };
    conexionABaseDeDatos.buscar(criterioDeBusqueda, entidadEmpleados, function (error, resultados) {
        if (error)
            manejarError(respuesta, error.stack, 409)
        else if (!hayResultados(resultados))
            manejarError(respuesta, "No se encontro al empleado", 404)
        else {
            conexionABaseDeDatos.eliminar(criterioDeBusqueda, entidadEmpleados, function (error, resp) {
                if (error)
                    manejarError(respuesta, error.stack, 409)
                else
                    respuesta.send("eliminado exitosamente");
            })
        }
    })
})

module.exports = router;