const UtilitariosFecha = require('../UtilitariosFecha');

class GeneradorBoleta {
  constructor() {
  }

  static obtener(empleado, metodoDePago) {
    let info = `BOLETA DE PAGO
    Empleado: ${empleado.nombre}
    Cargo: ${empleado.cargo}
    Salario: ${empleado.calcularSalarioTotal()} Bolivianos
    Metodo de pago: ${metodoDePago}
    Fecha de emision: ${UtilitariosFecha.obtenerFechaActualConFormato()}`;
    return info;
  }
}

module.exports = GeneradorBoleta;