const TarjetasDeVentas =require("../Tarjetas/TarjetasDeVentas");

class CalculadoraPorComision {
    constructor() {
        this.porcentaje = 0;
        this.sueldoBase = 0;
        this.tarjetaVentas = new TarjetasDeVentas();
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

    calcularSalarioTotal() {
        return this.sueldoBase + this.porcentaje * this.tarjetaVentas.calcularMontoTotal() / 100;
    }

    calcularSalario(fechaActual) {
        let anteriorViernes = this.retrocederNDias(fechaActual, 14);
        return this.sueldoBase + this.porcentaje * this.tarjetaVentas.calcularMontoTotalPorIntervalo(anteriorViernes, fechaActual) / 100;
    }

    retrocederNDias(fecha, dias) {
        let nuevaFecha = new Date(fecha);
        nuevaFecha.setDate(nuevaFecha.getDate() - dias);
        return nuevaFecha;
    }

    

}

module.exports = CalculadoraPorComision;