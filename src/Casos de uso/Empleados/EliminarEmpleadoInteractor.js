class EliminarEmpleadoInteractor {

    constructor(repositorio) {
        this.repositorio = repositorio;
    }

    async eliminarEmpleado(consulta) {
        try {
            await this.repositorio.eliminar({ ci: parseInt(consulta.params.ci) });
            return true;
        } catch (error) {
            return false;
        }
    }
}

module.exports = EliminarEmpleadoInteractor;