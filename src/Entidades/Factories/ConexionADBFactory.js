const ConexionAMongoDB = require('../../Adaptadores/ConexionesDB/ConexionAMongoDB');

class ConexionADBFactory {
    constructor() {}

    static async crearConexionADB(tecnologia, url, nombreBaseDeDatos) {
        switch(tecnologia) {
            case "mongo":
                const mongo = new ConexionAMongoDB();
                mongo.cliente = await mongo.conectar(url);
                mongo.baseDeDatos = mongo.cliente.db(nombreBaseDeDatos);
                return mongo;
            default:
                return null;
        }
    }
}

module.exports = ConexionADBFactory;