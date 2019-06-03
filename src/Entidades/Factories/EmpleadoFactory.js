const MetodoDePagoFactory = require('./MetodoDePagoFactory');
const MetodoDeEnvioFactory = require('./MetodoDeEnvioFactory');
const Empleado = require('../Empleados/Empleado');
const CalculadoraTiempoCompleto = require('../Calculadora salario/CalculadoraTiempoCompleto');
const CalculadoraTiempoParcial = require('../Calculadora salario/CalculadoraTiempoParcial');
const CalculadoraPorComision = require('../Calculadora salario/CalculadoraPorComision');
const VerificadorFechaDePagaTiempoCompleto = require('../VerificardorFechaDePaga/VerificadorFechaDePagaTiempoCompleto');
const VerificadorFechaDePagaTiempoParcial = require('../VerificardorFechaDePaga/VerificadorFechaDePagaTiempoParcial');
const VerificadorFechaDePagaComision = require('../VerificardorFechaDePaga/VerificadorFechaDePagaComision');
const TarjetasDeHorasTrabajadas = require('../Tarjetas/TarjetasDeHorasTrabajadas');
const TarjetasDeVentas = require('../Tarjetas/TarjetasDeVentas');

class EmpleadoFactory {
    constructor() { }

    static crearEmpleado(empleado) {
        let empleadoRespuesta = new Empleado(empleado.nombre, empleado.ci, empleado.cargo, empleado.email);        
        var calculadora, verificador, tarjeta, metodoDePago, metodoDeEnvio;
        switch (empleado.tipo) {
            case "tiempo completo":
                calculadora = new CalculadoraTiempoCompleto();
                empleadoRespuesta.establecerCalculadora(calculadora);
                empleadoRespuesta.establecerSalarioMensual(empleado.salarioMensual);
                empleadoRespuesta.establecerFechaInicioTrabajo(empleado.fechaInicioTrabajo);
                verificador = new VerificadorFechaDePagaTiempoCompleto();
                empleadoRespuesta.establecerVerificadorDiaDePaga(verificador);
                break;
            case "tiempo parcial":
                calculadora = new CalculadoraTiempoParcial();
                empleadoRespuesta.establecerCalculadora(calculadora);
                empleadoRespuesta.establecerSalarioPorHora(empleado.salarioPorHora);
                tarjeta = new TarjetasDeHorasTrabajadas();
                empleadoRespuesta.establecerTarjetaDeHorasTrabajadas(tarjeta);
                verificador = new VerificadorFechaDePagaTiempoParcial();
                empleadoRespuesta.establecerVerificadorDiaDePaga(verificador);
                break;
            case "por comision":
                calculadora = new CalculadoraPorComision();
                empleadoRespuesta.establecerCalculadora(calculadora);
                empleadoRespuesta.establecerSueldoBase(empleado.sueldoBase);
                empleadoRespuesta.establecerPorcentajePorComision(empleado.porcentajeComision);
                tarjeta = new TarjetasDeVentas();
                empleadoRespuesta.establecerTarjetaDeHorasTrabajadas(tarjeta);
                verificador = new VerificadorFechaDePagaComision();
                empleadoRespuesta.establecerVerificadorDiaDePaga(verificador);
                break;
            default:
                break;

        }
        metodoDePago = MetodoDePagoFactory.obtenerMetodoDePago(empleado.metodoDePago);
        empleadoRespuesta.establecerMetodoDePago(metodoDePago);
        // metodoDeEnvio = MetodoDeEnvioFactory.obtenerMetodoDeEnvio(empleado.metodoDeEnvio);
        empleadoRespuesta.metodoDeEnvioCadena = empleado.metodoDeEnvio;
        return empleadoRespuesta;
    }
}

module.exports = EmpleadoFactory;