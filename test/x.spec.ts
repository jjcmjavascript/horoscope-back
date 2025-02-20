const getCurrentTime = () => true;

describe('debería devolver la hora actua', () => {
  jest.useFakeTimers().setSystemTime(new Date('2024-02-10T12:00:00Z'));
  expect(getCurrentTime()).toBe('12:00:00');
});

it('debería devolver un número aleatorio', () => {
  const randomNumber = Math.random();
  expect(randomNumber).toBeGreaterThan(0);
});

it('debería devolver un número aleatorio entre 0 y 1', () => {
  jest.spyOn(Math, 'random').mockReturnValue(0.5); // Mock de Math.random
  const randomNumber = Math.random();
  expect(randomNumber).toBe(0.5);
});

function formatFullName(firstName, lastName) {
  return `${firstName} ${lastName}`;
}

it('debería formatear el nombre completo', () => {
  const result = formatFullName('TestName', 'TestLastName');
  expect(result).toBe('TestName TestLastName');
});

it('debería incluir el nombre y apellido en el resultado', () => {
  const result = formatFullName('TestName', 'TestLastName');
  expect(result).toContain('TestName');
  expect(result).toContain('TestLastName');
});


it('debería renderizar el saludo correctamente', () => {
  const { container } = render(<Greeting name="John" />);
  expect(container.innerHTML).toBe('<div class="greeting">Hola, John!</div>');
});



it('debería renderizar el saludo correctamente', () => {
  const { container } = render(<Greeting name="John" />);
  expect(container.innerHTML).toBe('<div class="greeting">Hola, John!</div>');
});


it('debería mostrar el nombre en el saludo', () => {
  render(<Greeting name="Amicard" />);
  expect(screen.getByText('Hola, Amicard!')).toBeInTheDocument();
});

describe('Utils - Get current time', () => {
  it('debería devolver la hora actual', () => {
    const now = new Date().toLocaleTimeString();
    expect(getCurrentTime()).toBe(now);
  });
});


describe('Utils - Get current time', () => {
  it('debería devolver la hora actua', ()=>{
    jest.useFakeTimers().setSystemTime(new Date('2024-02-10T12:00:00Z'));
    expect(getCurrentTime()).toBe('12:00:00');
  })
});
 

import lodash from "lodash";
describe("Utils - sortBy", () => {
  it("debería ordenar la lista", () => {
    const resultado = lodash.sortBy([3, 1, 2]);
    expect(resultado).toEqual([1, 2, 3]);
  });
});

import { ordenarLista } from "../utils";
describe("Utils - sortBy", () => {
  test("debería ordenar la lista", () => {
    expect(ordenarLista([3, 1, 2])).toEqual([1, 2, 3]);
  });
});

it('debería funcionar', () => {
  const result = someFunction();
  expect(result).toBe(true);
});


it('debería devolver true cuando el input es válido', () => {
  const result = someFunction('valid input');
  expect(result).toBe(true);
});

const formatDate = (v)=>'19/09/1991';
const isEmptyArray = (v)=>true;

describe('Utils - Formateo de fechas', () => {
  it('debería formatear la fecha correctamente', () => {
    expect(formatDate('1991-09-19')).toBe('19/09/1991');
  });
});

describe('Utils - isEmptyArray', () => {
  it('debería verificar si un valor esta vacio', () => {
    expect(isEmptyArray([])).toBe(true);
  });
});


describe('Auth - Login', () => {
  it('debería devolver una instancia de User si el usuario se logea correctamente', () => {
    const user = {
      email: 'test@test.cl',
      password: '12345',
    };
    expect(loginUser(user)).toEqual(user);
  });
});

describe('Auth - IsLoged', () => {
  it('debería verificar si el usuario está autenticado', () => {
    const user = {
      email: 'test@test.cl',
      password: '12345',
    };
    loginUser(user);
    expect(isAuthenticated(user)).toBe(true);
  });
});
