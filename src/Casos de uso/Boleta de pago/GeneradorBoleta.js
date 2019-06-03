const UtilitariosFecha = require('../../Entidades/Utilitarios/UtilitariosFecha');

class GeneradorBoleta {
  constructor() {
  }

  static obtener(empleado, fecha) {
    let info = `BOLETA DE PAGO
    Empleado: ${empleado.nombre}
    Cargo: ${empleado.cargo}
    Salario: ${empleado.calcularSalario(fecha)} Bolivianos
    Metodo de pago: ${empleado.obtenerMetodoDePago()}
    Fecha de emision: ${UtilitariosFecha.formatearFecha(fecha)}`;
    return info;
  }
}

module.exports = GeneradorBoleta;