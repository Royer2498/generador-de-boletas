const ConexionAMongoDB = require('./src/server/ConexionesDB/ConexionAMongoDB');

var conexionABaseDeDatos;
var coleccionEmpleados;
var con;

async function main() {
    con = new ConexionAMongoDB();
    dibi = await con.conectar("mongodb://localhost:27017/", 'generador-de-boletas');
    coleccionEmpleados = dibi.collection("empleados");
    con.obtenerTodos(coleccionEmpleados, function (error, empleados) {
        if (error)
            console.log(error);
        else {
            console.log(empleados);
        }
    })
}

function obtenerEmpleados() {
    return new Promise(function (resolve, reject) {
        con.obtenerTodos(coleccionEmpleados, function (error, empleados) {
            if (error)
                reject(error);
            else {
                resolve(empleados);
            }
        })
    })
}

async function verEmpleados() {
    let empleados = await obtenerEmpleados();
    return empleados;
}

function imprimir() {
    let empleados = verEmpleados();
    console.log("=============================");
    console.log(empleados);
    console.log("=============================");

}

main();