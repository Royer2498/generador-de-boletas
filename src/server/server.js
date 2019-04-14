const express = require('express');
const app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const MongoClient = require('mongodb').MongoClient

var db;
MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
    db = client.db('generador-de-boletas');
    app.listen(3000, function () {
        console.log('listening on 3000')
    })
})

app.get("/empleados", function (req, res) {
    let coleccionEmpleados = db.collection('empleados');
    coleccionEmpleados.find().toArray(function (err, results) {
        if (err)
            res.send(418).send(err.stack);
        else
            res.send(results);
    })
})

app.get("/empleado", function (req, res) {
    let ci = parseInt(req.query.ci);
    let coleccionEmpleados = db.collection('empleados');
    coleccionEmpleados.find({ ci: ci }).toArray(function (err, results) {
        if (err)
            res.status(409).send(err.stack);
        else if (results.length == 0)
            res.status(404).send("no se encontro el empleado")
        else
            res.send(results);
    })
})

app.post("/empleado", function (req, res) {
    let empleado = req.body;
    let coleccionEmpleados = db.collection('empleados');
    coleccionEmpleados.find({ ci: parseInt(empleado.ci) }).toArray(function (err, results) {
        if (err)
            res.status(409).send(err.stack);
        else if (results.length > 0)
            res.status(409).send("ya existe un empleado con ese ci");
        else {
            coleccionEmpleados.insertOne(empleado, function (err, resp) {
                if (err)
                    res.status(409).send(err.stack);
                res.send("insertado exitosamente");
            })
        }

    })
})

app.put("/empleado", function (req, res) {
    let empleado = req.body;
    empleado.ci = parseInt(empleado.ci);
    let coleccionEmpleados = db.collection('empleados');
    coleccionEmpleados.find({ ci: empleado.ci }).toArray(function (err, results) {
        if (err)
            res.status(409).send(err.stack);
        else if (results.length == 0)
            res.status(404).send("no se encontro el empleado");
        else {
            coleccionEmpleados.updateOne({ ci: empleado.ci }, { $set: empleado }, function (err, resp) {
                if (err)
                    res.status(409).send(err.stack);
                res.send("actualizado exitosamente");
            })
        }
    })
})

app.delete("/empleado", function (req, res) {
    let ci = parseInt(req.query.ci);
    let coleccionEmpleados = db.collection('empleados');
    coleccionEmpleados.find({ ci: ci }).toArray(function (err, results) {
        if (err)
            res.status(409).send(err.stack);
        else if (results.length == 0)
            res.status(404).send("no se encontro el empleado");
        else {
            coleccionEmpleados.removeOne({ ci: ci }, function (err, resp) {
                if (err)
                    res.status(409).send(err.stack);
                res.send("eliminado exitosamente");
            })
        }
    })
})