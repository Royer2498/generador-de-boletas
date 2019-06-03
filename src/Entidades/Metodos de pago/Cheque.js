class Cheque {
    constructor(empleado) {
        this.empleado = empleado;
    }

    pagar(fecha) {
        let cheque = `CHEQUE
    Fecha de emision: ${UtilitariosFecha.formatearFecha(fecha)};
    Paguese a la orden de: ${empleado.nombre}
    La suma de: ${empleado.calcularSalario(fecha)} Bolivianos`
        return cheque;
    }
}

module.exports = Cheque;