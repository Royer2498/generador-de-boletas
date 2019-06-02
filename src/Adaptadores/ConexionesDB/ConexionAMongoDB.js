const MongoClient = require('mongodb').MongoClient

class ConexionAMongoDB {
    constructor() {
        this.cliente = null;
        this.baseDeDatos = null;
    }

    conectar(url) {
        return new Promise(function(resolve, reject) {
            MongoClient.connect(url, { useNewUrlParser: true }, (error, cliente) => {
                if (error)
                    reject(error);
                else {
                    resolve(cliente);
                    console.log("conectado correctamente a MongoDB");
                }
            });
        })
    }

    cerrarConexion() {
        this.cliente.close();
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