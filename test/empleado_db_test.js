var expect = require("chai").expect;
var mongoMock = require('mongo-mock');
var assert = require("chai").assert;

import { Empleado } from "../src/Empleados/Empleado";
import { AssertionError } from "assert";

describe("Base de datos", function () {

    var baseDeDatosSimulada = mongoMock.MongoClient;
    var urlBaseDeDatos = 'mongodb://localhost:27017/generador-de-boletas';

    it("si creamos un empleado llamado Benito Perez deberia crearlo correctamente", function (done) {
        baseDeDatosSimulada.connect(urlBaseDeDatos, {}, function (error, baseDeDatos) {
            var coleccion = baseDeDatos.collection('empleados');
            var empleado = new Empleado("Benito Perez", 123, "Gerente");
            coleccion.insertMany(empleado, function (err, resultado) {
                let empleadoResultado = resultado.ops[0];
                expect(empleado.nombre).eq(empleadoResultado.nombre);
                expect(empleado.ci).eq(empleadoResultado.ci);
                expect(empleado.cargo).eq(empleadoResultado.cargo);
                done();
            });
            baseDeDatos.close();
        });
    });

    it("si insertamos un empleado llamado pepito deberiamos poder obtenerlo", function (done) {
        baseDeDatosSimulada.connect(urlBaseDeDatos, {}, function (error, baseDeDatos) {
            var coleccion = baseDeDatos.collection('empleados');
            var empleado = new Empleado("Pepito", 456, "Gerente");
            coleccion.insertMany(empleado, function (err, resultadoInsert) {
                let empleadoResultado = resultadoInsert.ops[0];
                coleccion.find({ ci: empleadoResultado.ci }).toArray(function (err, resultadoFind) {
                    let empleadoEncontrado = resultadoFind[0];
                    expect(empleado.nombre).eq(empleadoEncontrado.nombre);
                    expect(empleado.ci).eq(empleadoEncontrado.ci);
                    expect(empleado.cargo).eq(empleadoEncontrado.cargo);
                    done();
                });

            });
            baseDeDatos.close();
        });
    });

    it(`si insertamos un empleado llamado Juanito y lo ascendemos a cliente deberiamos poder obtenerlo
    con su cargo actualizado`, function (done) {
            baseDeDatosSimulada.connect(urlBaseDeDatos, {}, function (error, baseDeDatos) {
                var coleccion = baseDeDatos.collection('empleados');
                var empleado = new Empleado("Juanito", 789, "Gerente");
                coleccion.insertMany(empleado, function (err, resultadoInsert) {
                    let empleadoResultado = resultadoInsert.ops[0];
                    coleccion.updateOne({ ci: empleadoResultado.ci }, { $set: { cargo: "Cliente" } },
                        function (err, resultadoUpdate) {
                            coleccion.find({ ci: empleadoResultado.ci }).toArray(function (err, resultadoFind) {
                                let empleadoEncontrado = resultadoFind[0];
                                expect(empleado.nombre).eq(empleadoEncontrado.nombre);
                                expect(empleado.ci).eq(empleadoEncontrado.ci);
                                expect("Cliente").eq(empleadoEncontrado.cargo);
                                done();
                            });
                        });

                });
                baseDeDatos.close();
            });
        });

    it(`si insertamos un empleado llamado Ismael y lo eliminamos de la base de datos, ya no
    deberiamos poder enconotrarlo`, function (done) {
            baseDeDatosSimulada.connect(urlBaseDeDatos, {}, function (error, baseDeDatos) {
                var coleccion = baseDeDatos.collection('empleados');
                var empleado = new Empleado("Ismael", 156, "Conserje");
                coleccion.insertMany(empleado, function (err, resultadoInsert) {
                    let empleadoResultado = resultadoInsert.ops[0];
                    coleccion.removeOne({ ci: empleadoResultado.ci }, function (err, resultadoRemove) {
                        coleccion.find({ ci: empleadoResultado.ci }).toArray(function (err, resultadoFind) {
                            expect(resultadoFind.length).eq(0);
                            done();
                        });
                    });

                });
                baseDeDatos.close();
            });
        });

});
