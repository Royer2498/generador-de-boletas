export class TarjetaVentas {
    constructor() {
        this.registroDeVentas = [];
    }

    registrarVenta(fecha, nombre, monto) {
        let transaccion = { nombre: nombre, monto: monto };
        let indice = this.obtenerIndiceDeVenta(fecha);
        if (this.existeElRegistro(indice))
            this.registroDeVentas[indice].transacciones.push(transaccion);
        else {
            let registro = { fecha: fecha, transacciones: [] };
            registro.transacciones.push(transaccion);
            this.registroDeVentas.push(registro);
        }
    }

    existeElRegistro(indice) {
        return indice != -1;
    }

    obtenerIndiceDeVenta(fecha) {
        for (let i = 0; i < this.registroDeVentas.length; i++) {
            if (this.registroDeVentas[i].fecha == fecha)
                return i;
        }
        return -1;
    }

    calcularMontoTotal() {
        var montoTotal = 0;
        for (let registro of this.registroDeVentas)
            montoTotal += this.obtenerMontoTotalDeUnDia(registro);
        return montoTotal;
    }

    laFechaEstaEnIntervalo(fecha, fechaInicio, fechaFin) {
        return new Date(fecha) >= new Date(fechaInicio) && new Date(fecha) <= new Date(fechaFin);
    }

    obtenerMontoTotalDeUnDia(registro) {
        var montoTotal = 0;
        for (let transaccion of registro.transacciones)
            montoTotal += transaccion.monto;
        return montoTotal;
    }

    calcularMontoTotalPorIntervalo(fechaInicio, fechaFin) {
        var montoTotal = 0;
        for (let registro of this.registroDeVentas) {
            if (this.laFechaEstaEnIntervalo(registro.fecha, fechaInicio, fechaFin))
                montoTotal += this.obtenerMontoTotalDeUnDia(registro);
        }
        return montoTotal;
    }
}