const express = require('express');
const router = express.Router();
const ConexionAMongoDB = require('../ConexionesDB/ConexionAMongoDB');

var conexionABaseDeDatos;
var coleccionEmpleados;

(async function() {
    conexionABaseDeDatos = new ConexionAMongoDB();
    let conexionInicializada = await conexionABaseDeDatos.conectar("mongodb://localhost:27017/", 'generador-de-boletas');
    coleccionEmpleados = conexionInicializada.collection("empleados");
})();


function manejarError(respuesta, mensajeDeError, codigo) {
    respuesta.status(codigo).send(mensajeDeError);
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
        else if (!hayResultados(resultados))
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
        else if (hayResultados(resultados))
            manejarError(respuesta, "Ya existe un empleado con ese CI", 409)
        else {
            conexionABaseDeDatos.insertar(empleado, coleccionEmpleados, function (error, resp) {
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
    conexionABaseDeDatos.insertarVarios(empleados, coleccionEmpleados, function (error, resp) {
        if (error)
            manejarError(respuesta, error.stack, 409);
        else
            respuesta.send("insertados exitosamente");
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
                        manejarError(respuesta, error.stack, 409);
                    else
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
        else if (!hayResultados(resultados))
            manejarError(respuesta, "No se encontro al empleado", 404)
        else {
            conexionABaseDeDatos.eliminar(criterioDeBusqueda, coleccionEmpleados, function (error, resp) {
                if (error)
                    manejarError(respuesta, error.stack, 409)
                else
                    respuesta.send("eliminado exitosamente");
            })
        }
    })
})

module.exports = router;