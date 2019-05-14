class Cheque {
    constructor(empleado) {
        this.empleado = empleado;
    }

    pagar() {
        let cheque = `CHEQUE
    Fecha de emision: ${UtilitariosFecha.formatearFecha(fecha)};
    Paguese a la orden de: ${empleado.nombre}
    La suma de: ${empleado.calcularSalarioTotal()} Bolivianos`
        return cheque;
    }
}

module.exports = Cheque;