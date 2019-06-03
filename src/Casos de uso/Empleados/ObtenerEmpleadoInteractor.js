class ObtenerEmpleadoInteractor {

    constructor(repositorio) {
        this.repositorio = repositorio;
    }

    async obtenerEmpleado(criterio) {
        return await this.repositorio.buscar(criterio);
    }
}

module.exports = ObtenerEmpleadoInteractor;