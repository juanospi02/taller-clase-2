//1. umportaciones necesarias
//2.importar e proveedor para hacer peticiones http
//3. importar herramientas que permitan simular interacciones con mis peticiones

import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';

//2. definir el bloque de prueba

describe('pruebas para servicio login', () => {
  //variables--------------------------
  /*mock -> objeto o funcion falsa-> simuar un comportamiento
   */
  let loginService: LoginService;
  let httpMock: HttpTestingController; // simula interacciones con http
  const urlTest = 'http://localhost:9000/iniciarSesion';
  const emailTest = 'juanospina123@gmail.com';
  const passwordTest = '123';
  const tokenTest = 'juanjesus4321';

  //beforeach y afterall -> configuracion global

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    //inyeccion de servicios

    loginService = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterAll(() => {
    httpMock.verify(); //evalua que despues de todas las pruebas no queden peticiones pendientes
  });

  // 3. definir nuestros casos de prueba

  //caso de prueba 1.
  it('deberia hacer una peticion post para iniciar sesion', () => {
    const mockRespuesta = {
      //similar la respuesta que devolviera el backend
      mensaje: 'inicio de sesion exitoso',
      token: tokenTest,
    };
    loginService.login(emailTest, passwordTest).subscribe(
      (res)=>{
        expect(res).toEqual(mockRespuesta);
      }
    )

    // grarantizar que la peticion se este haciendo a una url en particular

    const peticion = httpMock.expectOne(urlTest)
    //garantizar el metodo 
    expect(peticion.request.method).toBe('POST')

  //esto es lo que simula la respuesta del servidor
    peticion.flush(mockRespuesta)


  });

  //caso de prueba 2.
  it('deberia obtener el localStorage ', () => {
    localStorage.setItem('token',tokenTest)//esto es lo que estoy guardando en el locaStorage
    expect(loginService.getToken()).toBe(tokenTest);
  });

  //caso de prueba 3.
  it('deberia verificar si el usuario esta logueado', () => {
  //tenemos token
  localStorage.setItem('token',tokenTest)
  expect(loginService.isLoggedIn()).toBeTrue();//respuesta booleana vdd


  });

  // caso de prueba 4

  it('deberia cerrar sesion', () => {
    loginService.logout();
    expect(localStorage.getItem('token')).toBeNull//si cierro sesion elimino localstorage,si quiero acceder a localstorage, me debo devolver a null
  });
});
