var expect = require("chai").expect;

import { GeneradorDeBoletas } from "../src/Boleta de pago/GeneradorDeBoletas";
import { Empleado } from "../src/Empleados/Empleado";
import { CalculadoraTiempoParcial } from "../src/Calculadora salario/CalculadoraTiempoParcial";
import { CalculadoraPorComision } from "../src/Calculadora salario/CalculadoraPorComision";
import { CalculadoraTiempoCompleto } from "../src/Calculadora salario/CalculadoraTiempoCompleto";
import { TarjetasDeHorasTrabajadas } from '../src/Tarjetas/TarjetasDeHorasTrabajadas';
import { TarjetasDeVentas } from "../src/Tarjetas/TarjetasDeVentas";


describe("BoletasDePagoTest", function () {
    var generadorDeBoletas;
    var empleados = [];

    before(function() {

        var empleado1 = new Empleado("Juan Perez", 123, 'Gerente');
        var empleado2 = new Empleado("Carlos Torres", 111, 'Presidente');
        var empleado3 = new Empleado("Pedro Perez", 222, 'Vice Presidente');
        var calculadoraTiempoCompleto = new CalculadoraTiempoCompleto();
        var calculadoraTiempoParcial = new CalculadoraTiempoParcial();
        var calculadoraPorComision = new CalculadoraPorComision();

        var tarjetasHorasTrabajadas = new TarjetasDeHorasTrabajadas();
        tarjetasHorasTrabajadas.registrarSesion("2019-03-31", "15:00:00", "20:00:00");
        tarjetasHorasTrabajadas.registrarSesion("2019-04-01", "10:00:00", "15:00:00");

        var tarjetaDeVentas = new TarjetasDeVentas();
        tarjetaDeVentas.registrarVenta("2019-03-31", "shampoo", 1000);
        tarjetaDeVentas.registrarVenta("2019-04-01", "arroz", 1000);
        tarjetaDeVentas.registrarVenta("2019-04-01", "papa", 20000);

        empleado1.establecerCalculadora(calculadoraTiempoCompleto);
        empleado1.establecerSalarioMensual(10000);

        empleado2.establecerCalculadora(calculadoraTiempoParcial);
        empleado2.establecerSalarioPorHora(100);
        empleado2.establecerTarjetaDeHorasTrabajadas(tarjetasHorasTrabajadas);

        empleado3.establecerCalculadora(calculadoraPorComision);
        empleado3.establecerPorcentajeDeComision(10);
        empleado3.establecerSueldoBase(100);
        empleado3.establecerTarjetaVentas(tarjetaDeVentas);
        
        empleados.push(empleado1);
        empleados.push(empleado2);
        empleados.push(empleado3);

        generadorDeBoletas = new GeneradorDeBoletas(empleados);
    });

    it(`Para un array de tres empleados si genereamos las boletas de pago para todos los empleados, la boleta del primer empleado (Juan Perez)
        deberia ser la correspondiente`, function () {
        var boletasGeneradas = generadorDeBoletas.generarBoletas();
        let fechaActualConFormato = String(new Date()).slice(0, 15);
        let boletaImpresa = `BOLETA DE PAGO
    Empleado: Juan Perez
    Cargo: Gerente
    Salario: 10000 Bolivianos
    Fecha de emision: ${fechaActualConFormato}`;
      expect(boletasGeneradas[0]).eq(boletaImpresa);
      });  

      it(`Para un array de tres empleados si genereamos las boletas de pago para todos los empleados, la boleta del primer empleado (Carlos Torres)
      deberia ser la correspondiente`, function () {
        var boletasGeneradas = generadorDeBoletas.generarBoletas();
        let fechaActualConFormato = String(new Date()).slice(0, 15);
        let boletaImpresa = `BOLETA DE PAGO
    Empleado: Carlos Torres
    Cargo: Presidente
    Salario: 1000 Bolivianos
    Fecha de emision: ${fechaActualConFormato}`;
        expect(boletasGeneradas[1]).eq(boletaImpresa);
      }); 

      it(`Para un array de tres empleados si genereamos las boletas de pago para todos los empleados, la boleta del primer empleado (Pedro Perez)
      deberia ser la correspondiente`, function () {
        var boletasGeneradas = generadorDeBoletas.generarBoletas();    
        let fechaActualConFormato = String(new Date()).slice(0, 15);
        let boletaImpresa = `BOLETA DE PAGO
    Empleado: Pedro Perez
    Cargo: Vice Presidente
    Salario: 2300 Bolivianos
    Fecha de emision: ${fechaActualConFormato}`;
        expect(boletasGeneradas[2]).eq(boletaImpresa);
  });
});
  