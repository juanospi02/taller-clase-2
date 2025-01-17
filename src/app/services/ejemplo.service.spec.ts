//ESTRUCTURA BASICA PARA HACER PRUEBAS UNITARIAS EN ANGULAR
/*
en el forntend no provamos servidores, ni bases de datos
- aca testeamos que le usuario este obteniendo la informacion que deberia 

QUE LA INTERFAZ FUNCIONE
*/
//configurar el entorno de pruebas en angular//
import { TestBed } from '@angular/core/testing';
// traiganse lo que se necesita testear 
import { EjemploService } from './ejemplo.service';


//definir nuestro bloque de pruebas
describe('EjemploService', () => {

//1. declarar las variables que vayamos a utilizar en nuestras pruebas
  let service: EjemploService;
//2. configuracion global -> el beforeEach siempre lo configuramos
//beforEach -> sucede antes de cada caso de prueba
  beforeEach(() => {
    //configurando el entorno de prueba
    TestBed.configureTestingModule({
      //todo lo que se necesite injectar -> importaciones,servicios, componente, proveedores
    providers: [EjemploService]
    });
    service = TestBed.inject(EjemploService);
  });
    //3. definir los casos de prueba 

  it('deberia haberse creado el servicio', () => {
    expect(service).toBeTruthy();
  });

  it ('deberia sumar dos numeros correctamente', ()=>{
  const resultado = service.suma(3,5);
  expect(resultado).toBe(8);
  })

});
