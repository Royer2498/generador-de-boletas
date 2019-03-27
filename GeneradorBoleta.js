export class GeneradorBoleta {
  constructor(empleado, ciudad) {
    this.empleado = empleado;
    this.ciudad = ciudad;
  }

  get salario() {
    return this.empleado.calcularSalario();
  }

  get nombre() {
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
    Empleado: ${this.nombre}
    Cargo: ${this.cargo}
    Salario: ${this.salario} ${this.moneda}
    Fecha de emision: ${this.fecha}`;
    return info;
  }
}
