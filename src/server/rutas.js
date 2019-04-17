var express = require('express');
var router = express.Router();

var empleado = require('./APIs/empleado');

router.use("/empleado", empleado);
module.exports = router;