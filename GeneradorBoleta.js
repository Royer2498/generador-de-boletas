
export class GeneradorBoleta{

    constructor(empleado){
        this.empleado = empleado;
    }

    get monto(){
        return this.empleado.sueldo;
    }

}