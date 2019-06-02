var express = require('express');
var router = express.Router();

var empleado = require('./empleado');
var generadorDeBoletas = require('./generadorDeBoletas');

router.use("/empleado", empleado);
router.use("/generador-boletas", generadorDeBoletas);
module.exports = router;