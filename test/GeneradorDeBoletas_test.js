var expect = require("chai").expect;
const request = require('request');

const GeneradorDeBoletas = require("../src/Casos de uso/Boleta de pago/GeneradorDeBoletas");
const ConexionADBFactory = require('../src/Entidades/Factories/ConexionADBFactory');
const EmpleadoRepositorio = require('../src/Entidades/Empleados/EmpleadoRepositorio');

describe("BoletasDePagoTest", function () {

  var conexionABaseDeDatos, empleadoRepositorio, respuestas, generador, fecha;
  before(async function () {
    conexionABaseDeDatos = await ConexionADBFactory.crearConexionADB("mongo", "mongodb://localhost:27017/", 'generador-de-boletas')
    empleadoRepositorio = new EmpleadoRepositorio(conexionABaseDeDatos, conexionABaseDeDatos.obtenerColeccion("empleados"));
    fecha = new Date(2019, 4, 31);
    generador = new GeneradorDeBoletas(empleadoRepositorio);
    respuestas = await generador.generarBoletas(fecha);
    console.log(respuestas);
  })

  after(async function () {
    conexionABaseDeDatos.cerrarConexion();
  })

  it(`Para el empleado existente en la base de datos, se deberia obtener el mensaje de confirmacion
  de envio de la boleta`, async function () {
      expect(respuestas[0].accepted.length).greaterThan(0);
    });
});
