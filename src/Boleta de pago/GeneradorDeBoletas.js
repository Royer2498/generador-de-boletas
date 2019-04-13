import { GeneradorBoleta } from "./GeneradorBoleta";

export class GeneradorDeBoletas{

    constructor(empleados){
        this.empleados = empleados;
    }

    generarBoletas(){
        let boletasDePago = [];
        for(let empleado of this.empleados){
            boletasDePago.push(GeneradorBoleta.imprimir(empleado));
        }
        return boletasDePago;
    }

}