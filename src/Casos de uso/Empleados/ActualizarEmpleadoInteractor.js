
class ActualizarEmpleadosInteractor {

    constructor(repositorio) {
        this.repositorio = repositorio;
    }

    async actualizarEmpleado(empleado) {
        try {
            await this.repositorio.actualizar({ ci: parseInt(empleado.ci) }, { $set: empleado });
            return true;
        } catch (error) {
            return false;
        }
    }
}

module.exports = ActualizarEmpleadosInteractor;