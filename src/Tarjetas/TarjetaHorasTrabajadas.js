export class TarjetaHorasTrabajadas {
    constructor() {
        this.registroDeHorasTrabajadas = [];
    }

    calcularHoras() {
        var milisegundos = 0;
        for (let registro of this.registroDeHorasTrabajadas)
            milisegundos += this.obtenerMilisegundosDeUnRegistro(registro);   
        return this.convertirMilisegundosAHoras(milisegundos);
    }

    calcularHorasPorIntervalo(fechaInicio, fechaFin) {
        var milisegundos = 0;
        for (let registro of this.registroDeHorasTrabajadas) {
            if (this.laFechaEstaEnIntervalo(registro.fecha, fechaInicio, fechaFin))
                milisegundos += this.obtenerMilisegundosDeUnRegistro(registro);
        }
        return this.convertirMilisegundosAHoras(milisegundos);
    }

    laFechaEstaEnIntervalo(fecha, fechaInicio, fechaFin) {
        return new Date(fecha) >= new Date(fechaInicio) && new Date(fecha) <= new Date(fechaFin);
    }

    obtenerMilisegundosDeUnRegistro(registro) {
        var milisegundos = 0;
        for (let horario of registro.horarios) {
            let horaEntrada = Date.parse(registro.fecha + " " + horario.horaEntrada);
            let horaSalida = Date.parse(registro.fecha + " " + horario.horaSalida);
            milisegundos += horaSalida - horaEntrada;
        }
        return milisegundos;
    }

    convertirMilisegundosAHoras(milisegundos) {
        return milisegundos / (1000 * 60 * 60);
    }

    registrarSesion(fecha, horaEntrada, horaSalida) {
        let horario = { horaEntrada: horaEntrada, horaSalida: horaSalida };
        let indice = this.obtenerIndiceDeRegistro(fecha);
        if (this.existeElRegistro(indice))
            this.registroDeHorasTrabajadas[indice].horarios.push(horario);
        else {
            let registro = { fecha: fecha, horarios: [] };
            registro.horarios.push(horario);
            this.registroDeHorasTrabajadas.push(registro);
        }
    }

    existeElRegistro(indice) {
        return indice != -1;
    }

    obtenerIndiceDeRegistro(fecha) {
        for (let i = 0; i < this.registroDeHorasTrabajadas.length; i++) {
            if (this.registroDeHorasTrabajadas[i].fecha == fecha)
                return i;
        }
        return -1;
    }
}