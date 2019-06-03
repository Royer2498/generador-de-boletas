class EmpleadoRepositorio {
    constructor(conexionADB, coleccion) {
        this.conexionADB = conexionADB;
        this.coleccion = coleccion;
    }

    async buscar(criterioDeBusqueda) {
        return await this.conexionADB.buscar(criterioDeBusqueda, this.coleccion);
    }

    async obtenerTodos() {
        return await this.conexionADB.obtenerTodos(this.coleccion);
    }

    async insertar(objetoAInsertar) {
        return await this.conexionADB.insertar(objetoAInsertar, this.coleccion);
    }

    async insertarVarios(objetosAInsertar) {
        return await this.conexionADB.insertarVarios(objetosAInsertar, this.coleccion);
    }

    async actualizar(criterioDeBusqueda, objetoActualizado) {
        return await this.conexionADB.actualizar(criterioDeBusqueda, objetoActualizado, this.coleccion);
    }

    async eliminar(criterioDeBusqueda) {
        return await this.conexionADB.eliminar(criterioDeBusqueda, this.coleccion);
    }    
}

module.exports = EmpleadoRepositorio;