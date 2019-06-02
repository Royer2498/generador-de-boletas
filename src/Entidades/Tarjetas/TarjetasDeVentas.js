const UtilitariosFecha = require('../Utilitarios/UtilitariosFecha');

class TarjetasDeVentas {
    constructor() {
        this.tarjetaDeVentas = [];
    }

    registrarVenta(fecha, nombre, monto) {
        let transaccion = { nombre: nombre, monto: monto };
        let indice = this.obtenerIndiceDeVenta(fecha);
        if (this.existeLaTarjeta(indice))
            this.tarjetaDeVentas[indice].transacciones.push(transaccion);
        else {
            let tarjeta = { fecha: fecha, transacciones: [] };
            tarjeta.transacciones.push(transaccion);
            this.tarjetaDeVentas.push(tarjeta);
        }
    }

    existeLaTarjeta(indice) {
        return indice != -1;
    }

    obtenerIndiceDeVenta(fecha) {
        for (let i = 0; i < this.tarjetaDeVentas.length; i++) {
            if (this.tarjetaDeVentas[i].fecha == fecha)
                return i;
        }
        return -1;
    }

    calcularMontoTotal() {
        var montoTotal = 0;
        for (let tarjeta of this.tarjetaDeVentas)
            montoTotal += this.obtenerMontoTotalDeUnDia(tarjeta);
        return montoTotal;
    }

    obtenerMontoTotalDeUnDia(tarjeta) {
        var montoTotal = 0;
        for (let transaccion of tarjeta.transacciones)
            montoTotal += transaccion.monto;
        return montoTotal;
    }

    calcularMontoTotalPorIntervalo(fechaInicio, fechaFin) {
        var montoTotal = 0;
        for (let tarjeta of this.tarjetaDeVentas) {
            if (UtilitariosFecha.laFechaEstaEnIntervalo(tarjeta.fecha, fechaInicio, fechaFin))
                montoTotal += this.obtenerMontoTotalDeUnDia(tarjeta);
        }
        return montoTotal;
    }

    obtenerFechaPrimerRegistro() {
        return this.tarjetaDeVentas[0].fecha;
    }
}

module.exports = TarjetasDeVentas;