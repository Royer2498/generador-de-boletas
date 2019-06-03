class GuardarEmpleadosInteractor {

    constructor(repositorio) {
        this.repositorio = repositorio;
    }

    async guardarEmpleados(empleados) {
        try {
            await this.repositorio.insertarVarios(empleados);
            return true;
        } catch (error) {
            return false;
        }
    }
}

module.exports = GuardarEmpleadosInteractor;