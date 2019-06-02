var expect = require("chai").expect;
const request = require('request');

const GeneradorDeBoletas = require("../src/Casos de uso/Boleta de pago/GeneradorDeBoletas");
const ConexionADBFactory = require('../src/Entidades/Factories/ConexionADBFactory');
const UtilitariosFecha = require('../src/Entidades/Utilitarios/UtilitariosFecha');

describe("BoletasDePagoTest", function () {

  var conexion, entidadEmpleados, boletasGeneradas, generador, fecha;
  before(async function () {
    conexion = await ConexionADBFactory.crearConexionADB("mongo", "mongodb://localhost:27017/", 'generador-de-boletas-test')
    entidadEmpleados = conexion.baseDeDatos.collection("empleados");
    fecha = new Date(2019, 4, 31);
    generador = new GeneradorDeBoletas(conexion, entidadEmpleados);
    boletasGeneradas = await generador.generarBoletas(fecha);
  })

  after(async function () {
    conexion.cerrarConexion();
  })

  it(`Para un array de tres empleados si genereamos las boletas de pago para todos los empleados,
  la boleta del primer empleado (Juan Perez) deberia ser la correspondiente`, async function () {

      let boletaImpresa = `BOLETA DE PAGO
    Empleado: Juan Perez
    Cargo: Gerente
    Salario: 10000 Bolivianos
    Metodo de pago: Efectivo
    Fecha de emision: ${UtilitariosFecha.formatearFecha(fecha)}`;
      expect(boletasGeneradas[0]).eq(boletaImpresa);
    });

  it(`Para un array de tres empleados si genereamos las boletas de pago para todos los empleados, la boleta del primer empleado (Carlos Torres)
      deberia ser la correspondiente`, function () {
      let boletaImpresa = `BOLETA DE PAGO
    Empleado: Carlos Torres
    Cargo: Presidente
    Salario: 1000 Bolivianos
    Metodo de pago: Efectivo
    Fecha de emision: ${ UtilitariosFecha.formatearFecha(fecha)}`;
      expect(boletasGeneradas[1]).eq(boletaImpresa);
    });

  it(`Para un array de tres empleados si genereamos las boletas de pago para todos los empleados, la boleta del primer empleado (Pedro Perez)
      deberia ser la correspondiente`, function () {
      let boletaImpresa = `BOLETA DE PAGO
    Empleado: Pedro Perez
    Cargo: Vice Presidente
    Salario: 2300 Bolivianos
    Metodo de pago: Efectivo
    Fecha de emision: ${ UtilitariosFecha.formatearFecha(fecha)}`;
      expect(boletasGeneradas[2]).eq(boletaImpresa);
    });
});
