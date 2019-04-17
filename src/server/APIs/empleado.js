const express = require('express');
const router = express.Router();
var coleccionEmpleados
var conexionABaseDeDatos
setTimeout(function () {
    conexionABaseDeDatos = require('../server')
    coleccionEmpleados = conexionABaseDeDatos.baseDeDatos.collection('empleados');
}, 2000);

router.get("/obtener-todos", function (req, res) {
    conexionABaseDeDatos.obtenerTodos(coleccionEmpleados, function (err, results) {
        if (err)
            res.send(418).send(err.stack);
        else
            res.send(results);
    })
})

router.get("/:ci", function (req, res) {
    let criterioDeBusqueda = { ci: parseInt(req.params.ci) };
    conexionABaseDeDatos.buscar(criterioDeBusqueda, coleccionEmpleados, function (err, results) {
        if (err)
            res.status(409).send(err.stack);
        else if (results.length == 0)
            res.status(404).send("no se encontro el empleado")
        else
            res.send(results);
    })
})

router.post("/", function (req, res) {
    let empleado = req.body;
    let criterioDeBusqueda = { ci: parseInt(empleado.ci) }
    conexionABaseDeDatos.buscar(criterioDeBusqueda, coleccionEmpleados, function (err, results) {
        if (err)
            res.status(409).send(err.stack);
        else if (results.length > 0)
            res.status(409).send("ya existe un empleado con ese ci");
        else {
            conexionABaseDeDatos.insertar(empleado, coleccionEmpleados, function (err, resp) {
                if (err)
                    res.status(409).send(err.stack);
                res.send("insertado exitosamente");
            })
        }

    })
})

router.put("/:ci", function (req, res) {
    let empleado = req.body;
    empleado.ci = parseInt(empleado.ci);
    let criterioDeBusqueda = { ci: parseInt(req.params.ci) }

    conexionABaseDeDatos.buscar(criterioDeBusqueda, coleccionEmpleados, function (err, results) {
        if (err)
            res.status(409).send(err.stack);
        else if (results.length == 0)
            res.status(404).send("no se encontro el empleado");
        else {
            conexionABaseDeDatos.actualizar({ ci: empleado.ci }, { $set: empleado }, coleccionEmpleados,
                function (err, resp) {
                    if (err)
                        res.status(409).send(err.stack);
                    res.send("actualizado exitosamente");
                })
        }
    })
})

router.delete("/:ci", function (req, res) {
    let criterioDeBusqueda = { ci: parseInt(req.params.ci) };
    conexionABaseDeDatos.buscar(criterioDeBusqueda, coleccionEmpleados, function (err, results) {
        if (err)
            res.status(409).send(err.stack);
        else if (results.length == 0)
            res.status(404).send("no se encontro el empleado");
        else {
            conexionABaseDeDatos.eliminar(criterioDeBusqueda, coleccionEmpleados, function (err, resp) {
                if (err)
                    res.status(409).send(err.stack);
                res.send("eliminado exitosamente");
            })
        }
    })
})

module.exports = router;