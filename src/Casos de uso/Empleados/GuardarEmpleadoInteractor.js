class GuardarEmpleadoInteractor {

    constructor(repositorio) {
        this.repositorio = repositorio;
    }

    async guardarEmpleado(empleado) {
        let emp;
        try {
            emp = await this.repositorio.buscar({ ci: parseInt(empleado.ci) });
        } catch(error) {
            console.log(error);
        }
        if (emp == null) {
            await this.repositorio.insertar(empleado);
            return true;
        }
        else
            return false;
    }
}

module.exports = GuardarEmpleadoInteractor;