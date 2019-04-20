const Empleado = require('./Empleados/Empleado');
const CalculadoraTiempoCompleto = require('./Calculadora salario/CalculadoraTiempoCompleto');
const CalculadoraTiempoParcial = require('./Calculadora salario/CalculadoraTiempoParcial');
const CalculadoraPorComision = require('./Calculadora salario/CalculadoraPorComision');
const TarjetasDeHorasTrabajadas = require('./Tarjetas/TarjetasDeHorasTrabajadas');
const TarjetasDeVentas = require('./Tarjetas/TarjetasDeVentas');

class Utilitarios {
    constructor() {
    }

    static parsearEmpleado(empleado) {
        empleado.__proto__ = Empleado.prototype;
        this.obtenerTipo(empleado);
        return empleado;
    }

    static obtenerTipo(empleado) {
        for (let atributo in empleado.calculadoraSalario) {
            if (atributo == "salarioMensual") {
                empleado.calculadoraSalario.__proto__ = CalculadoraTiempoCompleto.prototype;
                return;
            }
            if (atributo == "salarioPorHora") {
                empleado.calculadoraSalario.__proto__ = CalculadoraTiempoParcial.prototype;
                empleado.calculadoraSalario.tarjetaHorasTrabajadas.__proto__ = TarjetasDeHorasTrabajadas.prototype;
                return;
            }
            if (atributo == "porcentaje") {
                empleado.calculadoraSalario.__proto__ = CalculadoraPorComision.prototype;
                empleado.calculadoraSalario.tarjetaVentas.__proto__ = TarjetasDeVentas.prototype;
                return;
            }
        }
    }
}

module.exports = Utilitarios;