const MongoClient = require('mongodb').MongoClient

class ConexionAMongoDB {
    constructor(url, nombreBaseDeDatos) {
        this.baseDeDatos = null;
        MongoClient.connect(url, (error, cliente) => {
            if (error)
                console.log(error.stack);
            else {
                this.baseDeDatos = cliente.db(nombreBaseDeDatos);
                console.log("conectado correctamente a MongoDB");
            }
        });
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

    actualizar(criterioDeBusqueda, objetoActualizado, coleccion, callback) {
        coleccion.updateOne(criterioDeBusqueda, objetoActualizado, callback)
    }

    eliminar(criterioDeBusqueda, coleccion, callback) {
        coleccion.removeOne(criterioDeBusqueda, callback)
    }
}

module.exports = ConexionAMongoDB;