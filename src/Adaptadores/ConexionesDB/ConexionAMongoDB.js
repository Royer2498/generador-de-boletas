const MongoClient = require('mongodb').MongoClient

class ConexionAMongoDB {
    constructor() {
        this.cliente = null;
        this.baseDeDatos = null;
    }

    conectar(url) {
        return new Promise(function (resolve, reject) {
            MongoClient.connect(url, { useNewUrlParser: true }, (error, cliente) => {
                if (error)
                    reject(error);
                else {
                    console.log("conectado correctamente a MongoDB");
                    resolve(cliente);
                }
            });
        })
    }

    obtenerColeccion(nombre) {
        return this.baseDeDatos.collection(nombre);
    }

    cerrarConexion() {
        this.cliente.close();
    }

    buscar(criterioDeBusqueda, coleccion) {
        return new Promise(function (resolve, reject) {
            coleccion.find(criterioDeBusqueda).toArray(function (error, resultados) {
                if (error)
                    reject(error)
                else
                    resolve(resultados);
            })
        })
    }

    obtenerTodos(coleccion) {
        return new Promise(function (resolve, reject) {
            coleccion.find({}).toArray(function (error, resultados) {
                if (error)
                    reject(error);
                else
                    resolve(resultados);
            })
        })
    }

    insertar(objetoAInsertar, coleccion) {
        return new Promise(function (resolve, reject) {
            coleccion.insertOne(objetoAInsertar, function (error, resp) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(resp);
                }
            })
        })
    }

    insertarVarios(objetosAInsertar, coleccion) {
        return new Promise(function (resolve, reject) {
            coleccion.insertMany(objetosAInsertar, coleccion, function (error, resp) {
                if (error)
                    reject(error);
                else
                    resolve(resp);
            });
        })
    }

    actualizar(criterioDeBusqueda, objetoActualizado, coleccion) {
        return new Promise(function (resolve, reject) {
            coleccion.updateOne(criterioDeBusqueda, objetoActualizado, function (error, resp) {
                if (error) {
                    console.log("Error al actualizar: ", error)
                    reject(error);
                }
                else
                    resolve(resp);
            })
        })
    }

    eliminar(criterioDeBusqueda, coleccion) {
        return new Promise(function (resolve, reject) {
            coleccion.removeOne(criterioDeBusqueda, function (error, resp) {
                if (error)
                    reject(error);
                else
                    resolve(resp);
            })
        })
    }
}

module.exports = ConexionAMongoDB;