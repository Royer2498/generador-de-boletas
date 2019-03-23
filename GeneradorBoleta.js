export class GeneradorBoleta {
  constructor(empleado, ciudad) {
    this.empleado = empleado;
    this.ciudad = ciudad;
  }

  get monto() {
    return this.empleado.salario.monto;
  }

  get contribuyente() {
    return this.empleado.nombre;
  }

  get fecha() {
    var fechaActual = String(new Date());
    var fechaConFormato = fechaActual.slice(0, 15);
    return fechaConFormato;
  }

  get cargo() {
    return this.empleado.cargo;
  }

  get moneda() {
    return this.empleado.salario.moneda;
  }

  imprimir() {
    let info = `BOLETA DE PAGO
    Empleado: ${this.empleado.nombre}
    Cargo: ${this.empleado.cargo}
    Salario: ${this.empleado.salario.monto} ${this.empleado.salario.moneda}
    Fecha de emision: ${this.fecha}`;
    return info;
  }
}
