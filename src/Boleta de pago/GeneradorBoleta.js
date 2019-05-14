const UtilitariosFecha = require('../UtilitariosFecha');

class GeneradorBoleta {
  constructor() {
  }

  static obtener(empleado) {
    let info = `BOLETA DE PAGO
    Empleado: ${empleado.nombre}
    Cargo: ${empleado.cargo}
    Salario: ${empleado.calcularSalarioTotal()} Bolivianos
    Metodo de pago: ${empleado.metodoDePago}
    Fecha de emision: ${UtilitariosFecha.obtenerFechaActualConFormato()}`;
    return info;
  }
}

module.exports = GeneradorBoleta;