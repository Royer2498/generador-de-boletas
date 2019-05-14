const Empleado = require("./src/Empleados/Empleado");
const CalculadoraTiempoParcial = require("./src/Calculadora salario/CalculadoraTiempoParcial");
const CalculadoraPorComision = require("./src/Calculadora salario/CalculadoraPorComision");
const CalculadoraTiempoCompleto = require("./src/Calculadora salario/CalculadoraTiempoCompleto");
const VerificadorFechaDePagaComision = require('./src/VerificardorFechaDePaga/VerificadorFechaDePagaComision');
const VerificadorFechaDePagaTiempoCompleto = require('./src/VerificardorFechaDePaga/VerificadorFechaDePagaTiempoCompleto');
const VerificadorFechaDePagaTiempoParcial = require('./src/VerificardorFechaDePaga/VerificadorFechaDePagaTiempoParcial');
const TarjetasDeHorasTrabajadas = require('./src/Tarjetas/TarjetasDeHorasTrabajadas');
const TarjetasDeVentas = require("./src/Tarjetas/TarjetasDeVentas");
const Efectivo = require('./src/Metodos de pago/Efectivo');
const ConexionADBFactory = require('./src/Factories/ConexionADBFactory')

var empleados = [];

function insertarEmpleados() {
    var empleado1 = new Empleado("Juan Perez", 123, 'Gerente');
    var empleado2 = new Empleado("Carlos Torres", 111, 'Presidente');
    var empleado3 = new Empleado("Pedro Perez", 222, 'Vice Presidente');
    var calculadoraTiempoCompleto = new CalculadoraTiempoCompleto();
    var calculadoraTiempoParcial = new CalculadoraTiempoParcial();
    var calculadoraPorComision = new CalculadoraPorComision();
    var verificadorTiempoCompleto = new VerificadorFechaDePagaTiempoCompleto();
    var verificadorTiempoParcial = new VerificadorFechaDePagaTiempoParcial();
    var metodoDePagoEfectivo = new Efectivo();

    var tarjetasHorasTrabajadas = new TarjetasDeHorasTrabajadas();
    tarjetasHorasTrabajadas.registrarSesion("2019-03-31", "15:00:00", "20:00:00");
    tarjetasHorasTrabajadas.registrarSesion("2019-04-01", "10:00:00", "15:00:00");

    var tarjetaDeVentas = new TarjetasDeVentas();
    tarjetaDeVentas.registrarVenta("2019-05-17", "shampoo", 1000);
    tarjetaDeVentas.registrarVenta("2019-05-18", "arroz", 1000);
    tarjetaDeVentas.registrarVenta("2019-05-20", "papa", 20000);
    var verificadorComision = new VerificadorFechaDePagaComision(new Date(2019, 04, 17));

    empleado1.establecerCalculadora(calculadoraTiempoCompleto);
    empleado1.establecerSalarioMensual(10000);
    empleado1.establecerVerificadorDiaDePaga(verificadorTiempoCompleto);
    empleado1.establecerMetodoDePago(metodoDePagoEfectivo);

    empleado2.establecerCalculadora(calculadoraTiempoParcial);
    empleado2.establecerSalarioPorHora(100);
    empleado2.establecerTarjetaDeHorasTrabajadas(tarjetasHorasTrabajadas);
    empleado2.establecerVerificadorDiaDePaga(verificadorTiempoParcial);
    empleado2.establecerMetodoDePago(metodoDePagoEfectivo);

    empleado3.establecerCalculadora(calculadoraPorComision);
    empleado3.establecerPorcentajeDeComision(10);
    empleado3.establecerSueldoBase(100);
    empleado3.establecerTarjetaVentas(tarjetaDeVentas);
    empleado3.establecerVerificadorDiaDePaga(verificadorComision);
    empleado3.establecerMetodoDePago(metodoDePagoEfectivo);

    empleados.push(empleado1);
    empleados.push(empleado2);
    empleados.push(empleado3);
}

(async function main() {
    insertarEmpleados();
    var conexionABaseDeDatos = await ConexionADBFactory.crearConexionADB("mongo", "mongodb://localhost:27017/", 'generador-de-boletas-test')
    var entidadEmpleados = conexionABaseDeDatos.baseDeDatos.collection("empleados");
    conexionABaseDeDatos.insertarVarios(empleados, entidadEmpleados, function (error, resp) {
        if (error)
            console.log(error);
        else
            console.log("exito");
    })
})();