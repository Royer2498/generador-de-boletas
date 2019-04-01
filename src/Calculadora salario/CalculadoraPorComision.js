import { TarjetaVentas } from "../Tarjetas/TarjetaVentas";

export class CalculadoraPorComision {
    constructor() {
        this.porcentaje = 0;
        this.sueldoBase = 0;
        this.tarjetaVentas = new TarjetaVentas();
    }

    establecerPorcentaje(porcentaje) {
        this.porcentaje = porcentaje;
    }

    establecerSueldoBase(sueldoBase) {
        this.sueldoBase = sueldoBase;
    }

    establecerTarjetaVentas(tarjetaVentas) {
        this.tarjetaVentas = tarjetaVentas;
    }

    calcularSalario() {
        return this.sueldoBase + this.porcentaje * this.tarjetaVentas.calcularMontoTotal() / 100;
    }
}


