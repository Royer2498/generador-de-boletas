const Empleado = require("./src/Entidades/Empleados/Empleado");
const CalculadoraTiempoParcial = require("./src/Entidades/Calculadora salario/CalculadoraTiempoParcial");
const CalculadoraPorComision = require("./src/Entidades/Calculadora salario/CalculadoraPorComision");
const CalculadoraTiempoCompleto = require("./src/Entidades/Calculadora salario/CalculadoraTiempoCompleto");
const VerificadorFechaDePagaComision = require('./src/Entidades/VerificardorFechaDePaga/VerificadorFechaDePagaComision');
const VerificadorFechaDePagaTiempoCompleto = require('./src/Entidades/VerificardorFechaDePaga/VerificadorFechaDePagaTiempoCompleto');
const VerificadorFechaDePagaTiempoParcial = require('./src/Entidades/VerificardorFechaDePaga/VerificadorFechaDePagaTiempoParcial');
const TarjetasDeHorasTrabajadas = require('./src/Entidades/Tarjetas/TarjetasDeHorasTrabajadas');
const TarjetasDeVentas = require("./src/Entidades/Tarjetas/TarjetasDeVentas");
const Efectivo = require('./src/Entidades/Metodos de pago/Efectivo');
const ConexionADBFactory = require('./src/Entidades/Factories/ConexionADBFactory')
const Mail = require('./src/Entidades/Metodos de envio/Mail')

var empleados = [];

function insertarEmpleados() {
    var empleado1 = new Empleado("Juan Perez", 123, 'Gerente', 'royertorrico2498@gmail.com');
    var empleado2 = new Empleado("Carlos Torres", 111, 'Presidente', 'royertorrico2498@gmail.com');
    var empleado3 = new Empleado("Pedro Perez", 222, 'Vice Presidente', 'royertorrico2498@gmail.com');

    //calculadoras de salario
    var calculadoraTiempoCompleto = new CalculadoraTiempoCompleto();
    var calculadoraTiempoParcial = new CalculadoraTiempoParcial();
    var calculadoraPorComision = new CalculadoraPorComision();

    //Verificadores de fecha de paga
    var verificadorTiempoCompleto = new VerificadorFechaDePagaTiempoCompleto();
    var verificadorTiempoParcial = new VerificadorFechaDePagaTiempoParcial();
    var verificadorComision = new VerificadorFechaDePagaComision(new Date(2019, 04, 17));


    //metodoDePago
    var metodoDePagoEfectivo = new Efectivo();

    //sindicato

    //Metodo de envip
    var metodoDeEnvioMail = "Email";


    var tarjetasHorasTrabajadas = new TarjetasDeHorasTrabajadas();
    tarjetasHorasTrabajadas.registrarSesion("2019-05-24", "8:00:00", "12:00:00");
    tarjetasHorasTrabajadas.registrarSesion("2019-05-24", "15:00:00", "19:00:00");
    tarjetasHorasTrabajadas.registrarSesion("2019-05-27", "8:00:00", "12:00:00");
    tarjetasHorasTrabajadas.registrarSesion("2019-05-27", "15:00:00", "19:00:00");
    tarjetasHorasTrabajadas.registrarSesion("2019-05-28", "8:00:00", "12:00:00");
    tarjetasHorasTrabajadas.registrarSesion("2019-05-28", "15:00:00", "19:00:00");
    tarjetasHorasTrabajadas.registrarSesion("2019-05-29", "8:00:00", "12:00:00");
    tarjetasHorasTrabajadas.registrarSesion("2019-05-29", "15:00:00", "19:00:00");
    tarjetasHorasTrabajadas.registrarSesion("2019-05-30", "8:00:00", "12:00:00");
    tarjetasHorasTrabajadas.registrarSesion("2019-05-30", "15:00:00", "19:00:00");
    tarjetasHorasTrabajadas.registrarSesion("2019-05-31", "8:00:00", "12:00:00");
    tarjetasHorasTrabajadas.registrarSesion("2019-05-31", "15:00:00", "19:00:00");



    var tarjetaDeVentas = new TarjetasDeVentas();
    tarjetaDeVentas.registrarVenta("2019-05-17", "shampoo", 1000);
    tarjetaDeVentas.registrarVenta("2019-05-20", "coca cola", 1000);
    tarjetaDeVentas.registrarVenta("2019-05-21", "sabana", 1000);
    tarjetaDeVentas.registrarVenta("2019-05-22", "almohada", 1000);
    tarjetaDeVentas.registrarVenta("2019-05-23", "arroz", 1000);
    tarjetaDeVentas.registrarVenta("2019-05-24", "papa", 1000);
    tarjetaDeVentas.registrarVenta("2019-05-27", "lechuga", 1000);
    tarjetaDeVentas.registrarVenta("2019-05-28", "tomate", 1000);
    tarjetaDeVentas.registrarVenta("2019-05-29", "repollo", 1000);
    tarjetaDeVentas.registrarVenta("2019-05-30", "pollo", 1000);
    tarjetaDeVentas.registrarVenta("2019-05-31", "palta", 1000);
    tarjetaDeVentas.registrarVenta("2019-05-31", "naranja", 1000);


    // var verificadorComision = new VerificadorFechaDePagaComision(new Date(2019, 04, 17));

    empleado1.establecerCalculadora(calculadoraTiempoCompleto);
    empleado1.establecerSalarioMensual(10000);
    empleado1.establecerVerificadorDiaDePaga(verificadorTiempoCompleto);
    empleado1.establecerMetodoDePago(metodoDePagoEfectivo);
    empleado1.establecerMetodoDeEnvio(metodoDeEnvioMail);
    // empleado1.establecerSindicato(sindicato);


    empleado2.establecerCalculadora(calculadoraTiempoParcial);
    empleado2.establecerSalarioPorHora(100);
    empleado2.establecerTarjetaDeHorasTrabajadas(tarjetasHorasTrabajadas);
    empleado2.establecerVerificadorDiaDePaga(verificadorTiempoParcial);
    empleado2.establecerMetodoDePago(metodoDePagoEfectivo);
    empleado2.establecerMetodoDeEnvio(metodoDeEnvioMail);


    empleado3.establecerCalculadora(calculadoraPorComision);
    empleado3.establecerPorcentajeDeComision(10);
    empleado3.establecerSueldoBase(100);
    empleado3.establecerTarjetaVentas(tarjetaDeVentas);
    empleado3.establecerVerificadorDiaDePaga(verificadorComision);
    empleado3.establecerMetodoDePago(metodoDePagoEfectivo);
    empleado3.establecerMetodoDeEnvio(metodoDeEnvioMail);


    empleados.push(empleado1);
    empleados.push(empleado2);
    empleados.push(empleado3);
    return empleados;
}

(async function main() {
    let nose = insertarEmpleados();
    console.log(nose);
    // console.log(empleados);
    var conexionABaseDeDatos = await ConexionADBFactory.crearConexionADB("mongo", "mongodb://localhost:27017/", 'generador-de-boletas');
    // console.log(conexionABaseDeDatos);
    var entidadEmpleados = conexionABaseDeDatos.obtenerColeccion("empleados");
    var respuesta;
    // console.log(entidadEmpleados);
    try {
        respuesta = await conexionABaseDeDatos.insertarVarios(nose, entidadEmpleados);
    } catch (error) {
        console.log("??????????????????????????????????????????????????????????");
        console.log(error);
    }
    console.log("=========================================================================");
    console.log(respuesta);
})();