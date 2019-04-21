class GeneradorBoleta {
  constructor() {
  }

  static get fecha() {
    var fechaActual = String(new Date());
    var fechaConFormato = fechaActual.slice(0, 15);
    return fechaConFormato;
  }

  static obtener(empleado, metodoDePago) {
    let info = `BOLETA DE PAGO
    Empleado: ${empleado.nombre}
    Cargo: ${empleado.cargo}
    Salario: ${empleado.calcularSalarioTotal()} Bolivianos
    Metodo de pago: ${metodoDePago}
    Fecha de emision: ${this.fecha}`;
    return info;
  }
}

module.exports = GeneradorBoleta;