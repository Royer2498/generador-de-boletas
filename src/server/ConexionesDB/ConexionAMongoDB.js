const MongoClient = require('mongodb').MongoClient

class ConexionAMongoDB {
    constructor() {
    }

    conectar(url, nombreBaseDeDatos) {
        return new Promise(function(resolve, reject) {
            MongoClient.connect(url, (error, cliente) => {
                if (error)
                    reject(error);
                else {
                    resolve(cliente.db(nombreBaseDeDatos));
                    console.log("conectado correctamente a MongoDB");
                }
            });
        })
    }

    buscar(criterioDeBusqueda, coleccion, callback) {
        coleccion.find(criterioDeBusqueda).toArray(callback)
    }

    obtenerTodos(coleccion, callback) {
        coleccion.find({}).toArray(callback)
    }

    insertar(objetoAInsertar, coleccion, callback) {
        coleccion.insertOne(objetoAInsertar, callback)
    }

    insertarVarios(objetosAInsertar, coleccion, callback) {
        coleccion.insertMany(objetosAInsertar, coleccion, callback);
    }

    actualizar(criterioDeBusqueda, objetoActualizado, coleccion, callback) {
        coleccion.updateOne(criterioDeBusqueda, objetoActualizado, callback)
    }

    eliminar(criterioDeBusqueda, coleccion, callback) {
        coleccion.removeOne(criterioDeBusqueda, callback)
    }
}

module.exports = ConexionAMongoDB;