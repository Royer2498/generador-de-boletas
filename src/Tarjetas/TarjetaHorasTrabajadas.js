export class TarjetaHorasTrabajadas {
    constructor() {
        /* let horario = { horaLlegada: null, horaSalida: null };
        let registro = {
            fecha: null, horarios: [horario]
        } */
        this.registros = [];
    }

    calcularHoras() {
        var milisegundos = 0;
        for (let registro of this.registros)
            milisegundos += this.obtenerMilisegundosDeUnRegistro(registro);   
        return this.convertirMilisegundosAHoras(milisegundos);
    }

    calcularHorasPorIntervalo(fechaInicio, fechaFin) {
        var milisegundos = 0;
        for (let registro of this.registros) {
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
        if (indice != -1)
            this.registros[indice].horarios.push(horario);
        else {
            let registro = { fecha: fecha, horarios: [] };
            registro.horarios.push(horario);
            this.registros.push(registro);
        }
    }

    obtenerIndiceDeRegistro(fecha) {
        for (let i = 0; i < this.registros.length; i++) {
            if (this.registros[i].fecha == fecha)
                return i;
        }
        return -1;
    }
}