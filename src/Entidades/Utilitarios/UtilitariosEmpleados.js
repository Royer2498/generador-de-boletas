const Empleado = require('../Empleados/Empleado');
const CalculadoraTiempoCompleto = require('../Calculadora salario/CalculadoraTiempoCompleto');
const CalculadoraTiempoParcial = require('../Calculadora salario/CalculadoraTiempoParcial');
const CalculadoraPorComision = require('../Calculadora salario/CalculadoraPorComision');
const TarjetasDeHorasTrabajadas = require('../Tarjetas/TarjetasDeHorasTrabajadas');
const TarjetasDeVentas = require('../Tarjetas/TarjetasDeVentas');
const VerificadorFechaDePagaComision = require('../VerificardorFechaDePaga/VerificadorFechaDePagaComision')
const VerificadorFechaDePagaTiempoCompleto = require('../VerificardorFechaDePaga/VerificadorFechaDePagaTiempoCompleto')
const VerificadorFechaDePagaTiempoParcial = require('../VerificardorFechaDePaga/VerificadorFechaDePagaTiempoParcial')
const Efectivo = require('../Metodos de pago/Efectivo');
const Deposito = require('../Metodos de pago/Deposito');
const Cheque = require('../Metodos de pago/Cheque');

class UtilitariosEmpleados {
    constructor() {
    }

    static parsearEmpleado(empleado) {
        empleado.__proto__ = Empleado.prototype;
        this.parsearCalculadora(empleado);
        this.parsearVerificador(empleado);
        this.parsearMetodoDePago(empleado);
        return empleado;
    }

    static parsearCalculadora(empleado) {
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

    static parsearVerificador(empleado) {
        for (let atributo in empleado.calculadoraSalario) {
            if (atributo == "salarioMensual") {
                empleado.verificadorFechaDePaga.__proto__ = VerificadorFechaDePagaTiempoCompleto.prototype;
                return;
            }
            if (atributo == "salarioPorHora") {
                empleado.verificadorFechaDePaga.__proto__ = VerificadorFechaDePagaTiempoParcial.prototype;
                return;
            }
            if (atributo == "porcentaje") {
                empleado.verificadorFechaDePaga.__proto__ = VerificadorFechaDePagaComision.prototype;
                return;
            }
        }
    }

    static parsearMetodoDePago(empleado) {
        switch (empleado.metodoDePagoCadena) {
            case 'Efectivo':
                empleado.metodoDePago.__proto__ = Efectivo.prototype;
                break;
            case 'Deposito':
                empleado.metodoDePago.__proto__ = Deposito.prototype;
                break;
            case 'Cheque':
                empleado.metodoDePago.__proto__ = Cheque.prototype;
                break;
            default:
                break;
        }
    }
}

module.exports = UtilitariosEmpleados;