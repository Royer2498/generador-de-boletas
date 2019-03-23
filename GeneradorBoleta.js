export class GeneradorBoleta {
  constructor(empleado, ciudad) {
    this.empleado = empleado;
    this.ciudad = ciudad;
  }

  get monto() {
    return this.empleado.sueldo;
  }

  get contribuyente() {
    return this.empleado.nombre;
  }

  get fecha() {
    var fechaActual = String(new Date());
    var fechaConFormato = fechaActual.slice(0, 15);
    return fechaConFormato;
  }

}
