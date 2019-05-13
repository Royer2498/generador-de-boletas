const TarjetasDeVentas =require("../Tarjetas/TarjetasDeVentas");
const UtilitariosFecha = require('../UtilitariosFecha');
const UtilitariosTiempo = require('../UtilitariosTiempo');

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

    calcularSalario(fecha) {
        let anteriorViernes = UtilitariosFecha.retrocederNDias(fecha, 14);
        return this.sueldoBase + this.porcentaje * this.tarjetaVentas.calcularMontoTotalPorIntervalo(anteriorViernes, fecha) / 100;
    }
}

module.exports = CalculadoraPorComision;