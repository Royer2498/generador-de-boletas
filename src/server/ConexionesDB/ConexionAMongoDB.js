const MongoClient = require('mongodb').MongoClient

class ConexionAMongoDB {
    constructor(url, nombreBaseDeDatos) {
        this.baseDeDatos = this.hacerLaConexion(url, nombreBaseDeDatos);
        // MongoClient.connect(url, (error, cliente) => {
        //     if (error)
        //         console.log(error.stack);
        //     else {
        //         this.baseDeDatos = cliente.db(this.nombreBaseDeDatos);
        //         console.log("conectado correctamente a MongoDB");
        //     }
        // });
    }
    async hacerLaConexion(url, nombreBaseDeDatos) {
        var c = await this.conectar(url, nombreBaseDeDatos);
        return c;
    }

    conectar(url, nombreBaseDeDatos) {
        return new Promise(function (resolve) {
            MongoClient.connect(url, (error, cliente) => {
                if (error) {
                    throw new error(error.stack);
                }
                else {
                    console.log("conectado correctamente a MongoDB");
                    resolve(cliente.db(nombreBaseDeDatos));
                }
            })
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