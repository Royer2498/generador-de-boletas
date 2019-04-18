var express = require('express');
var router = express.Router();

var empleado = require('./APIs/empleado');
var generadorDeBoletas = require('./APIs/generadorDeBoletas');

router.use("/empleado", empleado);
router.use("/generador-boletas", generadorDeBoletas);
module.exports = router;