class ObtenerEmpleadosInteractor {
    
    constructor(repositorio) {
        this.repositorio = repositorio;
    }

    async obtenerEmpleados() {
        return await this.repositorio.obtenerTodos();
    }
}

module.exports = ObtenerEmpleadosInteractor;