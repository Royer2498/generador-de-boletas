class TarjetasDeHorasTrabajadas {
    constructor() {
        this.tarjetasDeHorasTrabajadas = [];
    }

    calcularHoras() {
        var milisegundos = 0;
        for (let tarjeta of this.tarjetasDeHorasTrabajadas)
            milisegundos += this.obtenerMilisegundosDeUnaTarjeta(tarjeta);   
        return this.convertirMilisegundosAHoras(milisegundos);
    }

    calcularHorasPorIntervalo(fechaInicio, fechaFin) {
        var milisegundos = 0;
        for (let tarjeta of this.tarjetasDeHorasTrabajadas) {
            if (this.laFechaEstaEnIntervalo(tarjeta.fecha, fechaInicio, fechaFin))
                milisegundos += this.obtenerMilisegundosDeUnaTarjeta(tarjeta);
        }
        return this.convertirMilisegundosAHoras(milisegundos);
    }

    laFechaEstaEnIntervalo(fecha, fechaInicio, fechaFin) {
        return new Date(fecha) >= new Date(fechaInicio) && new Date(fecha) <= new Date(fechaFin);
    }

    obtenerMilisegundosDeUnaTarjeta(tarjeta) {
        var milisegundos = 0;
        for (let horario of tarjeta.horarios) {
            let horaEntrada = Date.parse(tarjeta.fecha + " " + horario.horaEntrada);
            let horaSalida = Date.parse(tarjeta.fecha + " " + horario.horaSalida);
            milisegundos += horaSalida - horaEntrada;
        }
        return milisegundos;
    }

    convertirMilisegundosAHoras(milisegundos) {
        return milisegundos / (1000 * 60 * 60);
    }

    registrarSesion(fecha, horaEntrada, horaSalida) {
        let horario = { horaEntrada: horaEntrada, horaSalida: horaSalida };
        let indice = this.obtenerIndiceDeTarjeta(fecha);
        if (this.existeLaTarjeta(indice))
            this.tarjetasDeHorasTrabajadas[indice].horarios.push(horario);
        else {
            let tarjeta = { fecha: fecha, horarios: [] };
            tarjeta.horarios.push(horario);
            this.tarjetasDeHorasTrabajadas.push(tarjeta);
        }
    }

    existeLaTarjeta(indice) {
        return indice != -1;
    }

    obtenerIndiceDeTarjeta(fecha) {
        for (let i = 0; i < this.tarjetasDeHorasTrabajadas.length; i++) {
            if (this.tarjetasDeHorasTrabajadas[i].fecha == fecha)
                return i;
        }
        return -1;
    }

    obtenerHorasExtra() {
        let horasExtra = 0;
        for (let tarjeta of this.tarjetasDeHorasTrabajadas) {
            let milisegundos = this.obtenerMilisegundosDeUnaTarjeta(tarjeta);
            let horasExtraDelDia = this.obtenerHorasExtraDelDia(milisegundos);
            horasExtra += horasExtraDelDia;
        }
        return horasExtra;
    }

    obtenerHorasExtraDelDia(milisegundos) {
        let horasExtraDelDia = this.convertirMilisegundosAHoras(milisegundos) - 8;
        if (horasExtraDelDia < 0)
            horasExtraDelDia = 0;
        return horasExtraDelDia;
    }
}

module.exports = TarjetasDeHorasTrabajadas;