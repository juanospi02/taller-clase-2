import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('prueba para el servicio users', () => {
  let service: UsersService;
  let mockHttp: HttpTestingController;
  const urlTest = 'http://localhost:9000/usuarios';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(UsersService);
    mockHttp = TestBed.inject(HttpTestingController);
  });

  afterAll(() => {
    mockHttp.verify(); //verificar que no queden peticiones pendientes
  });

  //caso de prueba 1.
  it('deberia hacer una peticion GET para mostrar los usuarios', () => {
    const mockUsers = [
      {
        fullName: 'juan ospina',
        email: 'juanospina123@gmail.com',
        password: '123',
      },
      {
        fullName: 'juana ospina',
        email: 'juanaospina123@gmail.com',
        password: '123',
      }
    ];

    const mockResponse = {
      mensaje: 'se encontraron almacenados',
      numeroUsuarios: mockUsers.length,
      datos:mockUsers
    }

    service.getUser().subscribe(
      (res)=>{
        expect(res).toEqual(mockResponse);
      }
    );

    const req = mockHttp.expectOne(urlTest);
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });
});
