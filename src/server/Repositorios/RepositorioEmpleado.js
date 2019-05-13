

var coleccionEmpleados
var conexionABaseDeDatos

class RepositorioEmpleado {
    constructor(conexionABaseDeDatos) {
        this.conexionABaseDeDatos = conexionABaseDeDatos;
        this.coleccionEmpleados = this.conexionABaseDeDatos.baseDeDatos.collection('empleados');
    }

    // setTimeout(function() {
    //     conexionABaseDeDatos = require('../server')
    //     coleccionEmpleados = conexionABaseDeDatos.baseDeDatos.collection('empleados');
    // }, 2000);

    manejarError(respuesta, mensajeDeError, codigo) {
        respuesta.status(codigo).send(mensajeDeError);
    }

    hayResultados(resultados) {
        return resultados.length > 0
    }

    obtenerTodos() {
        var respuesta = null;
        return new Promise(conexionABaseDeDatos.obtenerTodos(coleccionEmpleados, function (error, resultados) {
            if (error)
                manejarError(respuesta, error.stack, 418);
            else
                resolve(resultados);
        }))
    }

    obtenerPorCi(consulta) {
        let criterioDeBusqueda = { ci: parseInt(consulta.params.ci) };
        conexionABaseDeDatos.buscar(criterioDeBusqueda, coleccionEmpleados, function (error, resultados) {
            if (error)
                manejarError(respuesta, error.stack, 409);
            else if (!hayResultados(resultados))
                manejarError(respuesta, "No se encontro al empleado", 404)
            else
                respuesta.send(resultados);
        })
    }

    insertar(consulta, respuesta) {
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
    }

    editar(consulta, respuesta) {
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
    }

    eliminar(consulta, respuesta) {
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
    }
}

module.exports = RepositorioEmpleado;