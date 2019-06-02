const TarjetasDeVentas =require('../Tarjetas/TarjetasDeVentas');
const UtilitariosFecha = require('../Utilitarios/UtilitariosFecha');

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
        let anteriorViernes = UtilitariosFecha.retrocederNDias(fechaActual, 14);
        return this.sueldoBase + this.porcentaje * this.tarjetaVentas.calcularMontoTotalPorIntervalo(anteriorViernes, fechaActual) / 100;
    }
}

module.exports = CalculadoraPorComision;