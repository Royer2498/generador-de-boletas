var express = require('express');
var router = express.Router();

var empleado = require('./ControladorEmpleado');
var generadorDeBoletas = require('./ControladorGeneradorDeBoletas');

router.use("/empleado", empleado);
router.use("/generador-boletas", generadorDeBoletas);
module.exports = router;